package controllers_test

import (
	"github.com/AusDTO/cg-dashboard/controllers"
	"github.com/AusDTO/cg-dashboard/helpers"
	. "github.com/AusDTO/cg-dashboard/helpers/testhelpers"
	"testing"
)

type initAppTest struct {
	testName          string
	envVars           helpers.EnvVars
	returnRouterNil   bool
	returnSettingsNil bool
	returnErrorNil    bool
}

var initAppTests = []initAppTest{
	{
		testName:          "Basic Valid EnvVars",
		envVars:           MockCompleteEnvVars,
		returnRouterNil:   false,
		returnSettingsNil: false,
		returnErrorNil:    true,
	},
	{
		testName:          "Blank EnvVars",
		envVars:           helpers.EnvVars{},
		returnRouterNil:   true,
		returnSettingsNil: true,
		returnErrorNil:    false,
	},
}

func TestInitApp(t *testing.T) {
	for _, test := range initAppTests {
		router, settings, err := controllers.InitApp(test.envVars)
		if (router == nil) != test.returnRouterNil {
			t.Errorf("Test %s did not return correct router value. Expected %t, Actual %t", test.testName, test.returnRouterNil, (router == nil))
		} else if (settings == nil) != test.returnSettingsNil {
			t.Errorf("Test %s did not return correct settings value. Expected %t, Actual %t", test.testName, test.returnSettingsNil, (settings == nil))
		} else if (err == nil) != test.returnErrorNil {
			t.Errorf("Test %s did not return correct error value. Expected %t, Actual %t", test.testName, test.returnErrorNil, (err == nil))
		}
	}
}

type initRouterTest struct {
	testName       string
	settings       *helpers.Settings
	returnValueNil bool
}

var initRouterTests = []initRouterTest{
	{
		testName:       "Non nil Settings",
		settings:       &helpers.Settings{},
		returnValueNil: false,
	},
	{
		testName:       "Nil Settings",
		settings:       nil,
		returnValueNil: true,
	},
}

func TestInitRouter(t *testing.T) {
	for _, test := range initRouterTests {
		router := controllers.InitRouter((test.settings))
		if (router == nil) != test.returnValueNil {
			t.Errorf("Test %s did not return correct router value. Expected %t, Actual %t\n", test.testName, test.returnValueNil, (router == nil))
		}
	}
}
