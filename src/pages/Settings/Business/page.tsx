import  { useState } from 'react';
import ShopInformation from './ShopInformation';
import BusinessDetails from './BusinessDetails';
import BusinessRepresentative from './BusinessRepresentative';
import BusinessOwners from './BusinessOwners';
import DocumentsUpload from './DocumentsUpload';
import Summary from './Summary';

const BusinessSettings = () => {
  const [currentStep, setCurrentStep] = useState('shop-info');

  const steps = [
    { id: 'shop-info', label: 'Shop Information' },
    { id: 'business-details', label: 'Business Details' },
    { id: 'business-representative', label: 'Business Representative' },
    { id: 'business-owners', label: 'Business Owners' },
    { id: 'documents-upload', label: 'Documents Upload' },
    { id: 'summary', label: 'Summary' },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 'shop-info':
        return <ShopInformation />;
      case 'business-details':
        return <BusinessDetails />;
      case 'business-representative':
        return <BusinessRepresentative />;
      case 'business-owners':
        return <BusinessOwners />;
      case 'documents-upload':
        return <DocumentsUpload />;
      case 'summary':
        return <Summary />;
      default:
        return <ShopInformation />;
    }
  };

  return (
    <div className="flex">
      {/* Steps Sidebar */}
      <div className="w-64 mr-8">
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${
                index < steps.length - 1 ? 'relative' : ''
              }`}
            >
              <button
                className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                  currentStep === step.id
                    ? 'bg-[#08B882] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setCurrentStep(step.id)}
              >
                {step.label}
              </button>
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-12 h-8 w-0.5 bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {renderStep()}
      </div>
    </div>
  );
};

export default BusinessSettings; 