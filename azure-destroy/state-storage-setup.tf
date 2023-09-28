provider "azurerm" {
  # Other configuration like version, client_id, client_secret, etc.
  
  features {}
}
terraform {
  backend "azurerm" {
    resource_group_name   = "state-storage-rg"
    storage_account_name  = "tfstate7miin"  # Ensure this matches the actual storage account name
    container_name        = "tfstate"
    key                   = "terraform.tfstate"
  }
}