import { createContext, useContext, useState, useEffect } from 'react';

const PropertyContext = createContext();

export function usePropertyContext() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within a PropertyProvider');
  }
  return context;
}

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/properties');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch properties');
      }

      setProperties(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const addProperty = async (propertyData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(propertyData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add property');
      }

      setProperties(prev => [...prev, data]);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const purchaseProperty = async (propertyId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/properties/${propertyId}/buy`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to purchase property');
      }

      // Update the local state with the purchased property
      setProperties(prev =>
        prev.map(prop =>
          prop.id === propertyId ? { ...prop, status: 'SOLD' } : prop
        )
      );

      return data;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    properties,
    loading,
    error,
    addProperty,
    purchaseProperty,
    refreshProperties: fetchProperties,
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
}
