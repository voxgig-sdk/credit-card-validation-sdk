package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewValidationEntityFunc func(client *CreditCardValidationSDK, entopts map[string]any) CreditCardValidationEntity

