export function generateICS(config: {
  title: string;
  date: string;
  time?: string;
  venueName: string;
  address: string;
}): string {
  const d = new Date(config.date + 'T00:00:00');
  const pad = (n: number) => String(n).padStart(2, '0');
  const dateStr = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const timeMatch = config.time?.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  let start = `DTSTART;VALUE=DATE:${dateStr}`;
  let end = `DTEND;VALUE=DATE:${dateStr}`;
  if (timeMatch) {
    let hour = Number(timeMatch[1]);
    const minute = Number(timeMatch[2]);
    const period = timeMatch[3].toUpperCase();
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    const endHour = (hour + 2) % 24;
    start = `DTSTART:${dateStr}T${pad(hour)}${pad(minute)}00`;
    end = `DTEND:${dateStr}T${pad(endHour)}${pad(minute)}00`;
  }

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding//Invite//EN',
    'BEGIN:VEVENT',
    start,
    end,
    `SUMMARY:${config.title}`,
    `LOCATION:${config.venueName}\\, ${config.address}`,
    `DESCRIPTION:You are cordially invited to the wedding celebration.`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadICS(config: {
  title: string;
  date: string;
  time?: string;
  venueName: string;
  address: string;
}) {
  const ics = generateICS(config);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'wedding-invite.ics';
  a.click();
  URL.revokeObjectURL(url);
}
