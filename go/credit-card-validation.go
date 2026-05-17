package voxgigcreditcardvalidationsdk

import (
	"github.com/voxgig-sdk/credit-card-validation-sdk/go/core"
	"github.com/voxgig-sdk/credit-card-validation-sdk/go/entity"
	"github.com/voxgig-sdk/credit-card-validation-sdk/go/feature"
	_ "github.com/voxgig-sdk/credit-card-validation-sdk/go/utility"
)

// Type aliases preserve external API.
type CreditCardValidationSDK = core.CreditCardValidationSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type CreditCardValidationEntity = core.CreditCardValidationEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type CreditCardValidationError = core.CreditCardValidationError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewValidationEntityFunc = func(client *core.CreditCardValidationSDK, entopts map[string]any) core.CreditCardValidationEntity {
		return entity.NewValidationEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewCreditCardValidationSDK = core.NewCreditCardValidationSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
