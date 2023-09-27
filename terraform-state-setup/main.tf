provider "azurerm" {
  features {}
}

resource "random_string" "resource_code" {
  length  = 5
  special = false
  upper   = false
}

resource "azurerm_resource_group" "tfstate" {
  name     = "state-storage-rg"
  location = "West Europe"
}

resource "azurerm_storage_account" "tfstate" {
  name                     = "tfstate${random_string.resource_code.result}"
  resource_group_name      = azurerm_resource_group.tfstate.name
  location                 = azurerm_resource_group.tfstate.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_container" "tfstate" {
  name                  = "tfstate"
  storage_account_name  = azurerm_storage_account.tfstate.name
  container_access_type = "private"
}

terraform {
  backend "azurerm" {
    resource_group_name   = "state-storage-rg"
    storage_account_name  = "tfstate7miin"  # Ensure this matches the actual storage account name
    container_name        = "tfstate"
    key                   = "terraform.tfstate"
  }
}