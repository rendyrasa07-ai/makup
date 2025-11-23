import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import PaymentStatusIndicator from '../../../components/ui/PaymentStatusIndicator';

const ClientDetailModal = ({ client, onClose }) => {
  const [activeTab, setActiveTab] = useState('events');

  if (!client) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })?.format(new Date(dateString));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  const getServiceTypeConfig = (type) => {
    const configs = {
      akad: {
        label: 'Akad',
        bgColor: 'bg-primary/10',
        textColor: 'text-primary'
      },
      resepsi: {
        label: 'Resepsi',
        bgColor: 'bg-secondary/10',
        textColor: 'text-secondary'
      },
      wisuda: {
        label: 'Wisuda',
        bgColor: 'bg-accent/10',
        textColor: 'text-accent'
      }
    };
    return configs?.[type] || configs?.akad;
  };

  const tabs = [
    { id: 'events', label: 'Acara', icon: 'Calendar' },
    { id: 'payments', label: 'Pembayaran', icon: 'CreditCard' },
    { id: 'communication', label: 'Komunikasi', icon: 'MessageSquare' }
  ];

  return (
    <div 
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="client-detail-title"
    >
      <div 
        className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden elevation-12 animate-in fade-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e?.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
              <Image
                src={client?.profileImage}
                alt={client?.profileImageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 id="client-detail-title" className="text-xl font-heading font-bold text-foreground">
                {client?.name}
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Icon name="Phone" size={14} />
                  {client?.phone}
                </span>
                {client?.email && (
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Icon name="Mail" size={14} />
                    {client?.email}
                  </span>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
            aria-label="Tutup"
          />
        </div>

        <div className="border-b border-border">
          <div className="flex items-center gap-2 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 border-b-2 transition-smooth
                  ${activeTab === tab?.id
                    ? 'border-primary text-primary font-medium' :'border-transparent text-muted-foreground hover:text-foreground'
                  }
                `}
                aria-selected={activeTab === tab?.id}
                role="tab"
              >
                <Icon name={tab?.icon} size={18} />
                <span className="text-sm">{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'events' && (
            <div className="space-y-4">
              {client?.events?.map((event, index) => {
                const serviceConfig = getServiceTypeConfig(event?.serviceType);
                return (
                  <div key={index} className="bg-surface rounded-lg p-4 border border-border">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium ${serviceConfig?.bgColor} ${serviceConfig?.textColor}`}>
                          {serviceConfig?.label}
                        </span>
                        <PaymentStatusIndicator 
                          status={event?.paymentStatus}
                          type="badge"
                          showIcon={true}
                          amount={event?.totalAmount}
                        />
                      </div>
                      <span className="text-lg font-heading font-bold text-foreground font-mono">
                        {formatCurrency(event?.totalAmount)}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
                        <span className="text-sm text-foreground">
                          {formatDate(event?.eventDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
                        <span className="text-sm text-muted-foreground font-mono">
                          {event?.eventTime}
                        </span>
                      </div>
                      {event?.venue && (
                        <div className="flex items-center gap-2 md:col-span-2">
                          <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
                          <span className="text-sm text-muted-foreground">
                            {event?.venue}
                          </span>
                        </div>
                      )}
                      {event?.packageName && (
                        <div className="flex items-center gap-2 md:col-span-2">
                          <Icon name="Package" size={16} color="var(--color-muted-foreground)" />
                          <span className="text-sm text-muted-foreground">
                            {event?.packageName}
                          </span>
                        </div>
                      )}
                    </div>
                    {event?.notes && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-sm text-muted-foreground">
                          {event?.notes}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-4">
              {client?.paymentHistory?.map((payment, index) => (
                <div key={index} className="bg-surface rounded-lg p-4 border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        {payment?.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(payment?.date)}
                      </p>
                    </div>
                    <span className="text-lg font-heading font-bold text-success font-mono">
                      {formatCurrency(payment?.amount)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Icon name="CreditCard" size={14} color="var(--color-muted-foreground)" />
                    <span className="text-xs text-muted-foreground">
                      {payment?.method}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'communication' && (
            <div className="space-y-4">
              {client?.communicationLog?.map((log, index) => (
                <div key={index} className="bg-surface rounded-lg p-4 border border-border">
                  <div className="flex items-start gap-3">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                      ${log?.type === 'outgoing' ? 'bg-primary/10' : 'bg-secondary/10'}
                    `}>
                      <Icon 
                        name={log?.type === 'outgoing' ? 'Send' : 'MessageSquare'} 
                        size={18} 
                        color={log?.type === 'outgoing' ? 'var(--color-primary)' : 'var(--color-secondary)'}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">
                          {log?.subject}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(log?.date)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {log?.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDetailModal;