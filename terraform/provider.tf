provider "azurerm" {
  skip_provider_registration = true
  features {}
}

terraform {
  backend "azurerm" {
  }
}
