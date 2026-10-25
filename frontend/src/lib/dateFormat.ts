const LOCALE = "hu-HU";
const TIME_ZONE = "Europe/Budapest";

type DateInput = string | number | Date;

const createFormatter = (options: Intl.DateTimeFormatOptions) => {
    const formatter = new Intl.DateTimeFormat(LOCALE, { ...options, timeZone: TIME_ZONE });
    return (date: DateInput) => formatter.format(new Date(date));
};

export const formatShortDate = createFormatter({
    month: "long",
    day: "numeric"
});

export const formatLongDate = createFormatter({
    year: "numeric",
    month: "long",
    day: "numeric"
});

export const formatDateTime = createFormatter({
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
});
