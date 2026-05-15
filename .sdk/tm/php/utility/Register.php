<?php
declare(strict_types=1);

// CreditCardValidation SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

CreditCardValidationUtility::setRegistrar(function (CreditCardValidationUtility $u): void {
    $u->clean = [CreditCardValidationClean::class, 'call'];
    $u->done = [CreditCardValidationDone::class, 'call'];
    $u->make_error = [CreditCardValidationMakeError::class, 'call'];
    $u->feature_add = [CreditCardValidationFeatureAdd::class, 'call'];
    $u->feature_hook = [CreditCardValidationFeatureHook::class, 'call'];
    $u->feature_init = [CreditCardValidationFeatureInit::class, 'call'];
    $u->fetcher = [CreditCardValidationFetcher::class, 'call'];
    $u->make_fetch_def = [CreditCardValidationMakeFetchDef::class, 'call'];
    $u->make_context = [CreditCardValidationMakeContext::class, 'call'];
    $u->make_options = [CreditCardValidationMakeOptions::class, 'call'];
    $u->make_request = [CreditCardValidationMakeRequest::class, 'call'];
    $u->make_response = [CreditCardValidationMakeResponse::class, 'call'];
    $u->make_result = [CreditCardValidationMakeResult::class, 'call'];
    $u->make_point = [CreditCardValidationMakePoint::class, 'call'];
    $u->make_spec = [CreditCardValidationMakeSpec::class, 'call'];
    $u->make_url = [CreditCardValidationMakeUrl::class, 'call'];
    $u->param = [CreditCardValidationParam::class, 'call'];
    $u->prepare_auth = [CreditCardValidationPrepareAuth::class, 'call'];
    $u->prepare_body = [CreditCardValidationPrepareBody::class, 'call'];
    $u->prepare_headers = [CreditCardValidationPrepareHeaders::class, 'call'];
    $u->prepare_method = [CreditCardValidationPrepareMethod::class, 'call'];
    $u->prepare_params = [CreditCardValidationPrepareParams::class, 'call'];
    $u->prepare_path = [CreditCardValidationPreparePath::class, 'call'];
    $u->prepare_query = [CreditCardValidationPrepareQuery::class, 'call'];
    $u->result_basic = [CreditCardValidationResultBasic::class, 'call'];
    $u->result_body = [CreditCardValidationResultBody::class, 'call'];
    $u->result_headers = [CreditCardValidationResultHeaders::class, 'call'];
    $u->transform_request = [CreditCardValidationTransformRequest::class, 'call'];
    $u->transform_response = [CreditCardValidationTransformResponse::class, 'call'];
});
