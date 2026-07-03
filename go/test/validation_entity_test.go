package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/credit-card-validation-sdk/go"
	"github.com/voxgig-sdk/credit-card-validation-sdk/go/core"

	vs "github.com/voxgig-sdk/credit-card-validation-sdk/go/utility/struct"
)

func TestValidationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Validation(nil)
		if ent == nil {
			t.Fatal("expected non-nil ValidationEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := validationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "validation." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set CREDITCARDVALIDATION_TEST_VALIDATION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		validationRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.validation", setup.data)))
		var validationRef01Data map[string]any
		if len(validationRef01DataRaw) > 0 {
			validationRef01Data = core.ToMapAny(validationRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = validationRef01Data

		// LOAD
		validationRef01Ent := client.Validation(nil)
		validationRef01MatchDt0 := map[string]any{}
		validationRef01DataDt0Loaded, err := validationRef01Ent.Load(validationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if validationRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func validationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "validation", "ValidationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read validation test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse validation test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"validation01", "validation02", "validation03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("CREDITCARDVALIDATION_TEST_VALIDATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CREDITCARDVALIDATION_TEST_VALIDATION_ENTID": idmap,
		"CREDITCARDVALIDATION_TEST_LIVE":      "FALSE",
		"CREDITCARDVALIDATION_TEST_EXPLAIN":   "FALSE",
		"CREDITCARDVALIDATION_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["CREDITCARDVALIDATION_TEST_VALIDATION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["CREDITCARDVALIDATION_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["CREDITCARDVALIDATION_APIKEY"],
			},
			extra,
		})
		client = sdk.NewCreditCardValidationSDK(core.ToMapAny(mergedOpts))
	}

	live := env["CREDITCARDVALIDATION_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["CREDITCARDVALIDATION_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
