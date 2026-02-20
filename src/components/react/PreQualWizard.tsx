import React, { useState, useEffect } from 'react';
import { Hammer, Wrench, AlertTriangle, Calendar, Clock, ArrowRight, Check, type LucideProps } from 'lucide-react';

const steps = [
    { id: 'service', title: 'Service Type' },
    { id: 'urgency', title: 'Urgency' },
    { id: 'details', title: 'Project Details' },
    { id: 'contact', title: 'Contact Info' }
];

interface ServiceType {
    id: string;
    title: string;
    icon: React.ComponentType<LucideProps>;
    description: string;
}

const serviceTypes: ServiceType[] = [
    { id: 'residential', title: 'Residential', icon: Wrench, description: 'Home repairs & maintenance' },
    { id: 'commercial', title: 'Commercial', icon: Wrench, description: 'Property management & compliance' },
    { id: 'renovation', title: 'Renovation', icon: Hammer, description: 'Kitchens, bathrooms, full builds' }
];

const urgencyLevels = [
    { id: 'emergency', title: 'Emergency (<24hrs)', icon: AlertTriangle, multiplier: 1.5, description: 'Water leaks, gas, power loss' },
    { id: 'asap', title: 'Urgent (1-3 Days)', icon: Clock, multiplier: 1.2, description: 'Broken fixtures, hot water issues' },
    { id: 'planned', title: 'Flexible / Planned', icon: Calendar, multiplier: 1.0, description: 'Maintenance, upgrades, quotes' }
];

interface PreQualWizardProps {
    initialServiceType?: string;
}

export default function PreQualWizard({ initialServiceType }: PreQualWizardProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        serviceType: initialServiceType || '',
        urgency: '',
        description: '',
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (initialServiceType) {
            setFormData(prev => ({ ...prev, serviceType: initialServiceType }));
        }
    }, [initialServiceType]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const updateData = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        const body = new URLSearchParams({
            'form-name': 'prequal-estimate',
            'service-type': formData.serviceType,
            'urgency': formData.urgency,
            'description': formData.description,
            'name': formData.name,
            'email': formData.email,
            'phone': formData.phone,
            'address': formData.address,
        }).toString();

        await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body,
        });

        setIsSubmitted(true);
    };

    const calculateEstimate = () => {
        let base = 150;
        if (formData.serviceType === 'renovation') base = 5000;
        if (formData.serviceType === 'commercial') base = 300;

        const urgencyMult = urgencyLevels.find(u => u.id === formData.urgency)?.multiplier || 1;
        const min = base * urgencyMult;
        const max = min * 2.5;

        return { min, max };
    };

    if (isSubmitted) {
        const { min, max } = calculateEstimate();
        return (
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 text-center max-w-lg mx-auto">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Estimate Ready!</h2>
                <p className="text-slate-600 mb-6">Based on your inputs, the estimated range for this work is:</p>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
                    <span className="text-4xl font-bold text-primary">${min} - ${max}</span>
                    <span className="block text-xs text-slate-400 mt-2">*Indicative estimate only. Subject to site visit.</span>
                </div>

                <p className="text-sm text-slate-500 mb-6">
                    One of our {formData.serviceType} specialists will contact you shortly to confirm details and arrange a site visit.
                </p>

                <button onClick={() => window.location.href = '/'} className="w-full py-3 bg-primary text-white rounded-lg font-bold hover:bg-slate-800 transition-colors">
                    Return Home
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-w-2xl mx-auto">
            <div className="bg-slate-50 border-b border-slate-200 px-8 py-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-700">Step {currentStep + 1} of {steps.length}</span>
                    <span className="text-sm font-bold text-accent">{steps[currentStep].title}</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-accent transition-all duration-300 ease-out"
                        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            <div className="p-8 min-h-[400px]">
                {currentStep === 0 && (
                    <div className="grid gap-4">
                        <h3 className="text-lg font-bold mb-4">What type of service do you need?</h3>
                        {serviceTypes.map(type => (
                            <button
                                key={type.id}
                                onClick={() => { updateData('serviceType', type.id); handleNext(); }}
                                className={`flex items-center p-4 rounded-xl border-2 transition-all text-left group hover:border-accent hover:bg-slate-50 ${formData.serviceType === type.id ? 'border-accent bg-blue-50/50' : 'border-slate-100'}`}
                            >
                                <div className={`p-3 rounded-lg mr-4 ${formData.serviceType === type.id ? 'bg-accent text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-accent group-hover:text-white transition-colors'}`}>
                                    {React.createElement(type.icon, { className: "w-6 h-6" })}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">{type.title}</div>
                                    <div className="text-sm text-slate-500">{type.description}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {currentStep === 1 && (
                    <div className="grid gap-4">
                        <h3 className="text-lg font-bold mb-4">How urgent is this request?</h3>
                        {urgencyLevels.map(level => (
                            <button
                                key={level.id}
                                onClick={() => { updateData('urgency', level.id); handleNext(); }}
                                className={`flex items-center p-4 rounded-xl border-2 transition-all text-left hover:border-accent hover:bg-slate-50 ${formData.urgency === level.id ? 'border-accent bg-blue-50/50' : 'border-slate-100'}`}
                            >
                                <div className={`p-3 rounded-lg mr-4 ${formData.urgency === level.id ? 'bg-accent text-white' : 'bg-slate-100 text-slate-500'}`}>
                                    {React.createElement(level.icon, { className: "w-6 h-6" })}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900">{level.title}</div>
                                    <div className="text-sm text-slate-500">{level.description}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold mb-2">Tell us a bit more...</h3>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Description of Work</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => updateData('description', e.target.value)}
                                className="w-full h-32 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                                placeholder="e.g. Leaking pipe under kitchen sink..."
                            />
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold mb-2">Where do we send the estimate?</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => updateData('name', e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => updateData('phone', e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => updateData('email', e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Property Address</label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => updateData('address', e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={`px-6 py-2 rounded-lg font-bold transition-colors ${currentStep === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'}`}
                >
                    Back
                </button>
                {currentStep > 1 && (
                    <button
                        onClick={handleNext}
                        className="px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-slate-800 transition-colors flex items-center gap-2"
                    >
                        {currentStep === steps.length - 1 ? 'Get Estimate' : 'Next'}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
}
