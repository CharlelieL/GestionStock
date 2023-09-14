provider "azurerm" {
  features {}
  ARM_CLIENT_ID = var.ARM_CLIENT_ID
  skip_provider_registration = true
}
variable "ARM_CLIENT_ID" {
  description = "Azure Subscription ID"
  type        = string
  sensitive   = true
}

variable "DATABASE_USER" {
  description = "MariaDB Administrator Login"
  type        = string
  sensitive   = true
}
variable "DATABASE_PASSWORD" {
  description = "MariaDB Administrator Password"
  type        = string
  sensitive   = true
}

resource "azurerm_resource_group" "rg" {
  name     = "myResourceGroup"
  location = "West Europe"
}

resource "azurerm_mariadb_server" "mariadb" {
  name                = "gestionstock-server"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  sku_name = "B_Gen5_1"

  storage_mb            = 5120
  backup_retention_days = 7
  geo_redundant_backup_enabled  = false

  administrator_login          = "var.DATABASE_USER"
  administrator_login_password = "var.DATABASE_PASSWORD"
  version                      = "10.2"
  ssl_enforcement_enabled      = "true"
}


resource "azurerm_mariadb_database" "gestionProjet" {
  name                = "gestionProjet"
  resource_group_name = azurerm_resource_group.rg.name
  server_name         = azurerm_mariadb_server.mariadb.name
  charset             = "utf8"
  collation           = "utf8_general_ci"
}

output "mariadb_server_fqdn" {
  value = azurerm_mariadb_server.mariadb.fqdn
}
