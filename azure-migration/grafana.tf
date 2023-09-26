resource "azurerm_dashboard_grafana" "grafana" {
  name                = "myGrafanaDashboard"
  resource_group_name = azurerm_resource_group.rg.name
  location            = "West Europe"
  api_key_enabled                   = true
  deterministic_outbound_ip_enabled = true
  public_network_access_enabled     = false

  identity {
    type = "SystemAssigned"
  }

  tags = {
    env = "production"
  }
}

