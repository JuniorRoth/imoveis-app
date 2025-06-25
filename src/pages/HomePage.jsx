import { useEffect } from 'react';
import { usePropertyContext } from '../context/PropertyContext';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { properties, loading, error, purchaseProperty } = usePropertyContext();
  const { user, isBuyer } = useAuth();

  const handlePurchase = async (propertyId) => {
    try {
      await purchaseProperty(propertyId);
      alert('Imóvel comprado com sucesso!');
    } catch (error) {
      alert(error.message || 'Erro ao comprar imóvel');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Carregando imóveis...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Encontre o Imóvel dos Seus Sonhos
          </h1>
          <p className="text-xl mb-8">
            Milhares de opções de casas e apartamentos para você escolher
          </p>
        </div>
      </section>

      {/* Property Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold mb-8">Imóveis Disponíveis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div 
              key={property.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-4">{property.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-indigo-600">
                    R$ {property.price.toLocaleString('pt-BR')}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    property.status === 'AVAILABLE' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {property.status === 'AVAILABLE' ? 'Disponível' : 'Vendido'}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
                  {property.bedrooms && (
                    <div>
                      <span className="font-medium">{property.bedrooms}</span> Quartos
                    </div>
                  )}
                  {property.bathrooms && (
                    <div>
                      <span className="font-medium">{property.bathrooms}</span> Banheiros
                    </div>
                  )}
                  {property.area && (
                    <div>
                      <span className="font-medium">{property.area}</span> m²
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Localização: {property.location}
                  </p>
                  {user && isBuyer && property.status === 'AVAILABLE' && (
                    <button
                      onClick={() => handlePurchase(property.id)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md"
                    >
                      Comprar Imóvel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              Nenhum imóvel disponível no momento.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
