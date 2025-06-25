const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    res.json(properties);
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ message: 'Error fetching properties' });
  }
};

// Get single property
exports.getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await prisma.property.findUnique({
      where: { id: parseInt(id) },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({ message: 'Error fetching property' });
  }
};

// Create property
exports.createProperty = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      price, 
      image, 
      location, 
      bedrooms, 
      bathrooms, 
      area 
    } = req.body;

    const property = await prisma.property.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        image,
        location,
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        area,
        sellerId: req.user.id
      }
    });

    res.status(201).json(property);
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ message: 'Error creating property' });
  }
};

// Update property status (for purchase)
exports.updatePropertyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if property exists and is available
    const property = await prisma.property.findUnique({
      where: { id: parseInt(id) }
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.status === 'SOLD') {
      return res.status(400).json({ message: 'Property is already sold' });
    }

    // Update property status to SOLD
    const updatedProperty = await prisma.property.update({
      where: { id: parseInt(id) },
      data: { status: 'SOLD' }
    });

    res.json(updatedProperty);
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({ message: 'Error updating property' });
  }
};
