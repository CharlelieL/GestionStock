
provider "azurerm" {
  features {}
  subscription_id = "5965b991-cecb-4428-8372-a624121cd5a6"
  skip_provider_registration = true
}

variable "current_ip" {
  description = "YOUR CURRENT IP"
  type        = string
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

  administrator_login          = "adminuser"
  administrator_login_password = "Pa5Ddzaffez*49--8"
  version                      = "10.2"
  ssl_enforcement_enabled      = "true"
}

resource "azurerm_mariadb_firewall_rule" "example" {
  name                = "allow_current_ip"
  resource_group_name = azurerm_resource_group.rg.name
  server_name         = azurerm_mariadb_server.mariadb.name
  start_ip_address    = var.current_ip
  end_ip_address      = var.current_ip

  depends_on = [azurerm_resource_group.rg]
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
