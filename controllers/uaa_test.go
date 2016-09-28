package controllers_test

import (
	"github.com/AusDTO/cg-dashboard/controllers"
	. "github.com/AusDTO/cg-dashboard/helpers/testhelpers"

	"fmt"
	"net/http"
	"testing"
)

var userinfoTests = []BasicProxyTest{
	{
		BasicSecureTest: BasicSecureTest{
			BasicConsoleUnitTest: BasicConsoleUnitTest{
				TestName:    "Basic User Info",
				SessionData: ValidTokenData,
				EnvVars:     MockCompleteEnvVars,
			},
			ExpectedResponse: "test",
			ExpectedCode:     http.StatusOK,
		},
		// What the "external" server will send back to the proxy.
		RequestMethod: "GET",
		RequestPath:   "/uaa/userinfo",
		ExpectedPath:  "/userinfo",
		Response:      "test",
		ResponseCode:  http.StatusOK,
	},
}

func TestUserinfo(t *testing.T) {
	for _, test := range userinfoTests {
		// Create the external server that the proxy will send the request to.
		testServer := CreateExternalServer(t, &test)
		// Construct full url for the proxy.
		fullURL := fmt.Sprintf("%s%s", testServer.URL, test.RequestPath)
		c := &controllers.UAAContext{SecureContext: &controllers.SecureContext{Context: &controllers.Context{}}}
		response, request, router := PrepareExternalServerCall(t, c.SecureContext, testServer, fullURL, test)
		router.ServeHTTP(response, request)
		VerifyExternalCallResponse(t, response, &test)
		testServer.Close()
	}
}

var queryUsersTests = []BasicProxyTest{
	{
		BasicSecureTest: BasicSecureTest{
			BasicConsoleUnitTest: BasicConsoleUnitTest{
				TestName:    "Basic Query Users Empty Body",
				SessionData: ValidTokenData,
				EnvVars:     MockCompleteEnvVars,
			},
			ExpectedResponse: "{\"status\": \"error\", \"message\": \"empty request body\"}",
			ExpectedCode:     http.StatusBadRequest,
		},
		// What the "external" server will send back to the proxy.
		RequestMethod: "POST",
		RequestPath:   "/uaa/Users",
		ExpectedPath:  "/Users",
	},
	{
		BasicSecureTest: BasicSecureTest{
			BasicConsoleUnitTest: BasicConsoleUnitTest{
				TestName:    "Basic Query Users Bad Filters",
				SessionData: ValidTokenData,
				EnvVars:     MockCompleteEnvVars,
			},
			ExpectedResponse: "{\"status\": \"error\", \"message\": \"not enough filters\"}",
			ExpectedCode:     http.StatusBadRequest,
		},
		// What the "external" server will send back to the proxy.
		RequestMethod: "POST",
		RequestPath:   "/uaa/Users",
		RequestBody:   []byte(string("hello")),
		ExpectedPath:  "/Users",
	},
	{
		BasicSecureTest: BasicSecureTest{
			BasicConsoleUnitTest: BasicConsoleUnitTest{
				TestName:    "Basic Query Users",
				SessionData: ValidTokenData,
				EnvVars:     MockCompleteEnvVars,
			},
			ExpectedResponse: "hello",
			ExpectedCode:     http.StatusOK,
		},
		// What the "external" server will send back to the proxy.
		RequestMethod: "POST",
		RequestPath:   "/uaa/Users",
		RequestBody:   []byte(string("{\"filter1\": \"value1\"}")),
		ExpectedPath:  "/Users",
		Response:      "hello",
		ResponseCode:  http.StatusOK,
	},
}
