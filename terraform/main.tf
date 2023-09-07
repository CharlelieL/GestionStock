# provider "azurerm" {
#   skip_provider_registration = true
#   features {}
# }


resource "azurerm_resource_group" "rg" {
  name = "rg-${var.env}-ipme"
  location = "West Europe"
}

resource "azurerm_virtual_network" "vn" {
  name                = "example-network"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
}

resource "azurerm_public_ip" "pip" {
  name="flo-pip"
  resource_group_name = azurerm_resource_group.rg.name
  location = azurerm_resource_group.rg.location
  allocation_method = "Dynamic"
}

resource "azurerm_subnet" "subnet" {
  name                 = "internal"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vn.name
  address_prefixes     = ["10.0.2.0/24"]
}

resource "azurerm_network_interface" "nic" {
  name                = "flo-nic"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.subnet.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id = azurerm_public_ip.pip.id
  }
}

resource "azurerm_linux_virtual_machine" "vm" {
  name                = "example-machine"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  size                = "Standard_B1s"
  admin_username      = "adminuser"
  network_interface_ids = [
    azurerm_network_interface.nic.id
  ]
  # priority = "Spot"
  # eviction_policy = "Delete"
  admin_ssh_key {
    username   = "adminuser"
    public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC3oly62lRY2foguC+JbITWHE2h5WG3IR7Dv3PWoAt6dQ3R1jamelBHNH1MyklrgEpADB4HybmJb3bMm9KezklpGWx4EkEouZnoxM0vu+Dt3Osmdf7B8zCiJzEZEMIQxCDzGcvbj1y5W9emByZVRIoYLzGvrTB1Qd8XCz4h0rUGHog36OMNnYCiZLXTgHhUETm+uuhn++yNDUza3xpsZ5gHD11NlNsMGMXqrzlkOqcoEDbwoDQoJD+pxXuQpMcm+LP6nEbZfQfgMqlY/n65s5COk4sgggY2wL/PgSa6QFk9KI47NOPCJGwhSNrvZylSwa7nYvrbrfJj24Uz1A0eXADPxSoMaNVoNBFGAeG9yspsLVmBD/2/pj9u7tjRMjyPcZ6obXkzV6pZhQfKp8T+f9mLB8mHGJCXsB0GYgwv7UusqrbkNwQZFgHzblMaPE96gCqWwHr6VFA/dJajitGWsQY/PCHP2gYZhJC8iUCDvD3vFgyFMgZIBPoKeR702cTnEPaS6q0JSR2KTK2spVLIzipomhYGt1PkmPrHDpJOzq4MDv+wbZlmwk6U92IvQ68NWVjp8sOAQtaGbTokHGZupFwY0lrkt/3aYrYe3MxSsjt4wtJXVFLY5KcG1eZiE+a1d8Oc1nf4Nb1/tt06KwS5dyHpo94W2xEJTp2cEmRfB6D5Ow== Florian@DESKTOP-V75BQ4L"
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-focal"
    sku       = "20_04-lts"
    version   = "latest"
  }
}

