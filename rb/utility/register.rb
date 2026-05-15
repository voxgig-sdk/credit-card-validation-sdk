# CreditCardValidation SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

CreditCardValidationUtility.registrar = ->(u) {
  u.clean = CreditCardValidationUtilities::Clean
  u.done = CreditCardValidationUtilities::Done
  u.make_error = CreditCardValidationUtilities::MakeError
  u.feature_add = CreditCardValidationUtilities::FeatureAdd
  u.feature_hook = CreditCardValidationUtilities::FeatureHook
  u.feature_init = CreditCardValidationUtilities::FeatureInit
  u.fetcher = CreditCardValidationUtilities::Fetcher
  u.make_fetch_def = CreditCardValidationUtilities::MakeFetchDef
  u.make_context = CreditCardValidationUtilities::MakeContext
  u.make_options = CreditCardValidationUtilities::MakeOptions
  u.make_request = CreditCardValidationUtilities::MakeRequest
  u.make_response = CreditCardValidationUtilities::MakeResponse
  u.make_result = CreditCardValidationUtilities::MakeResult
  u.make_point = CreditCardValidationUtilities::MakePoint
  u.make_spec = CreditCardValidationUtilities::MakeSpec
  u.make_url = CreditCardValidationUtilities::MakeUrl
  u.param = CreditCardValidationUtilities::Param
  u.prepare_auth = CreditCardValidationUtilities::PrepareAuth
  u.prepare_body = CreditCardValidationUtilities::PrepareBody
  u.prepare_headers = CreditCardValidationUtilities::PrepareHeaders
  u.prepare_method = CreditCardValidationUtilities::PrepareMethod
  u.prepare_params = CreditCardValidationUtilities::PrepareParams
  u.prepare_path = CreditCardValidationUtilities::PreparePath
  u.prepare_query = CreditCardValidationUtilities::PrepareQuery
  u.result_basic = CreditCardValidationUtilities::ResultBasic
  u.result_body = CreditCardValidationUtilities::ResultBody
  u.result_headers = CreditCardValidationUtilities::ResultHeaders
  u.transform_request = CreditCardValidationUtilities::TransformRequest
  u.transform_response = CreditCardValidationUtilities::TransformResponse
}
