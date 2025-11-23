import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import PaymentStatusIndicator from '../../../components/ui/PaymentStatusIndicator';

const ClientCard = ({ client, onEdit, onAddService, onSendReminder, onClick }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })?.format(new Date(dateString));
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

  const upcomingEvent = client?.events?.[0];
  const serviceConfig = upcomingEvent ? getServiceTypeConfig(upcomingEvent?.serviceType) : null;

  return (
    <div
      className="bg-card border border-border rounded-lg p-4 elevation-1 hover:elevation-3 transition-smooth cursor-pointer"
      onClick={onClick}
      role="article"
      aria-label={`Klien ${client?.name}`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
            <Image
              src={client?.profileImage}
              alt={client?.profileImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          {client?.isActive && (
            <span 
              className="absolute bottom-0 right-0 w-4 h-4 bg-success border-2 border-card rounded-full"
              aria-label="Klien aktif"
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-base font-heading font-semibold text-foreground truncate">
              {client?.name}
            </h3>
            {client?.totalEvents > 1 && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs font-medium whitespace-nowrap">
                <Icon name="Calendar" size={12} />
                {client?.totalEvents} Acara
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Icon name="Phone" size={14} />
            <span className="font-mono">{client?.phone}</span>
          </div>

          {client?.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="MapPin" size={14} />
              <span className="truncate">{client?.location}</span>
            </div>
          )}
        </div>
      </div>
      {upcomingEvent && (
        <div className="bg-surface rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-caption text-muted-foreground">
              Acara Mendatang
            </span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${serviceConfig?.bgColor} ${serviceConfig?.textColor}`}>
              {serviceConfig?.label}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Icon name="Calendar" size={14} color="var(--color-foreground)" />
            <span className="text-sm font-medium text-foreground">
              {formatDate(upcomingEvent?.eventDate)}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
            <span className="text-sm text-muted-foreground font-mono">
              {upcomingEvent?.eventTime}
            </span>
          </div>

          {upcomingEvent?.venue && (
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={14} color="var(--color-muted-foreground)" />
              <span className="text-sm text-muted-foreground truncate">
                {upcomingEvent?.venue}
              </span>
            </div>
          )}
        </div>
      )}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
        <div className="flex flex-col">
          <span className="text-xs font-caption text-muted-foreground mb-1">
            Total Pembayaran
          </span>
          <span className="text-lg font-heading font-bold text-foreground font-mono">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })?.format(client?.totalAmount)}
          </span>
        </div>
        <PaymentStatusIndicator 
          status={client?.paymentStatus}
          type="badge"
          showIcon={true}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Edit"
          iconPosition="left"
          onClick={(e) => {
            e?.stopPropagation();
            onEdit(client);
          }}
          className="flex-1"
        >
          Edit
        </Button>
        <Button
          variant="default"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={(e) => {
            e?.stopPropagation();
            onAddService(client);
          }}
          className="flex-1"
        >
          Tambah Layanan
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="Bell"
          onClick={(e) => {
            e?.stopPropagation();
            onSendReminder(client);
          }}
          aria-label="Kirim pengingat"
        />
      </div>
    </div>
  );
};

export default ClientCard;