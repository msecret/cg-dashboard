// +build acceptance

package acceptance

import (
	. "github.com/AusDTO/cg-dashboard/acceptance/util"
	. "github.com/AusDTO/cg-dashboard/acceptance/views"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
	"github.com/sclevine/agouti"
	. "github.com/sclevine/agouti/matchers"

	"net/http/httptest"
)

var _ = XDescribe("AppStructure", func() {
	var (
		page        *agouti.Page
		server      *httptest.Server
		testEnvVars AcceptanceTestEnvVars
		user        User
		nav         Nav
	)

	testEnvVars = AcceptanceTestEnvVars{}
	testEnvVars.LoadTestEnvVars()

	BeforeEach(func() {
		// Start a test server
		server, testEnvVars = startServer()

		// Create a fresh page to navigate.
		page = createPage()

		// Create user
		user = StartUserSessionWith(testEnvVars)

		// Log user in
		user.LoginTo(page)
	})

	It("should show app structure for an authenticated user", func() {
		By("allowing the user to click on an organization in the navigation", func() {
			nav = SetupClickFirstOrg(page)
		})

		By("allowing the user to click on any organization in navigation", func() {
			nav.ClickOrg(testEnvVars.TestOrgName)
		})

		By("showing the table containing spaces", func() {
			Expect(page.Find("#spacesTable")).To(BeFound())
			Expect(page.FindByXPath("//*[@id='spacesTable']/thead/tr/th[1]").Text()).To(Equal("Name"))
			Expect(page.FindByXPath("//*[@id='spacesTable']/thead/tr/th[2]").Text()).To(Equal("Number of Apps"))
			Expect(page.FindByXPath("//*[@id='spacesTable']/thead/tr/th[3]").Text()).To(Equal("Total Development Memory"))
			Expect(page.FindByXPath("//*[@id='spacesTable']/thead/tr/th[4]").Text()).To(Equal("Total Production Memory"))
		})

		By("allowing the user to click on a space in the tab views", func() {
			Expect(page.FindByLink(testEnvVars.TestSpaceName)).To(BeFound())
			Eventually(Expect(page.FindByLink(testEnvVars.TestSpaceName).Click()).To(Succeed()))
		})

		By("showing app name and quota information (along with other information)", func() {
			Eventually(page.Find("#app-name-heading")).Should(BeFound())
			Expect(page.Find("#buildpack-heading")).To(BeFound())
			Expect(page.Find("#memory-heading")).To(BeFound())
			Expect(page.Find("#instances-heading")).To(BeFound())
			Expect(page.Find("#state-heading")).To(BeFound())
			Expect(page.Find("#disk-quota-heading")).To(BeFound())

			Eventually(page.First(".app-name-data")).Should(BeFound())
			Eventually(page.First(".buildpack-data")).Should(BeFound())
			Eventually(page.First(".memory-data")).Should(BeFound())
			Eventually(page.First(".instances-data")).Should(BeFound())
			Eventually(page.First(".state-data")).Should(BeFound())
			Eventually(page.First(".disk-quota-data")).Should(BeFound())
		})

		// MARKETPLACE TESTS
		By("allowing the user to click on the org marketplace in the org dropdown menu", func() {
			SetupClickFirstOrg(page).ClickOrgMarketplace("")
		})

		By("showing the user a table with all the services", func() {
			Expect(page.Find("#service-name-heading")).To(BeFound())
			Expect(page.Find("#service-description-heading")).To(BeFound())
			Expect(page.Find("#service-date-created-heading")).To(BeFound())
			Expect(page.First(".service-name-data")).To(BeFound())
			Expect(page.First(".service-description-data")).To(BeFound())
			Expect(page.First(".service-date-created-data")).To(BeFound())
		})

		By("allowing the user to search for a service", func() {
			rowCountPreSearch, _ := page.All(".service-name-data").Count()
			Expect(page.Find("#serviceSearch").Fill("zzzzzzzzz1111zzz")).To(Succeed())
			Expect(page.All(".service-name-data")).NotTo(HaveCount(rowCountPreSearch))
		})
	})

	AfterEach(func() {
		// Logout user
		user.LogoutOf(page)
		// Destroy the page
		Expect(page.Destroy()).To(Succeed())
		// Close the server.
		server.Close()
	})
})
