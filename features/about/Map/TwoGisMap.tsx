import React from 'react';

const GoogleMapWidget = ({ height = 450, width = "100%" }) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full">
                <div
                    className="relative w-full rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50"
                    style={{ height: `${height}px` }}
                >
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3033.4681681202837!2d72.78574951111332!3d40.50914204989116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bdad36b8c73b37%3A0xd75757a61149de34!2z0JvQtdC00Lgg0JrQu9C40L3QuNC6!5e0!3m2!1sru!2skg!4v1758826514191!5m2!1sru!2skg" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Леди Клиник - Google Maps"
                        className="w-full h-full rounded-xl"
                    />

                    {/* Декоративные элементы */}
                    <div className="absolute -top-1 -left-1 w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20"></div>
                    <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-gradient-to-tl from-indigo-400 to-indigo-600 rounded-full opacity-20"></div>
                </div>
            </div>
        </div>
    );
};

export default GoogleMapWidget;