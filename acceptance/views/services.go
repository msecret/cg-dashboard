// +build acceptance

package util
import (
	. "github.com/onsi/gomega"
	"github.com/sclevine/agouti"
)

type Services struct {
	page *agouti.Page
}

func (s Services) DeleteServiceInstance(instanceName string) {
	Expect(s.page.Find("#service-instance-search").Fill(instanceName)).To(Succeed())
	Expect(s.page.All(".delete-unbound-service-instance-btn").Count()).To(Equal(1))
	Expect(s.page.First(".delete-unbound-service-instance-btn").Click()).To(Succeed())
	Expect(s.page.FindByButton("Confirm").Click()).To(Succeed())
}

func (s Services) DeleteBoundServiceInstance(instanceName string) {
	Expect(s.page.Find("#service-instance-search").Fill(instanceName)).To(Succeed())
	Expect(s.page.All(".delete-unbound-service-instance-btn").Count()).To(Equal(1))
	Expect(s.page.First(".delete-unbound-service-instance-btn").Click()).To(Succeed())
	Expect(s.page.FindByButton("Confirm").Click()).To(Succeed())
	Expect(s.page.All(".delete-bound-service-instance-btn").Count()).To(Equal(1))
	Expect(s.page.First(".delete-bound-service-instance-btn").Click()).To(Succeed())
	Expect(s.page.FindByButton("Confirm").Click()).To(Succeed())
}

func (s Services) VerifyServiceInstanceExists(instanceName string) {
	Expect(s.page.Find("#service-instance-search").Fill(instanceName)).To(Succeed())
	Expect(s.page.All(".delete-unbound-service-instance-btn").Count()).To(Equal(1))
}

func (s Services) VerifyServiceInstanceDoesNotExist(instanceName string) {
	Expect(s.page.Find("#service-instance-search").Fill(instanceName)).To(Succeed())
	Expect(s.page.All(".delete-unbound-service-instance-btn").Count()).To(Equal(0))
}
