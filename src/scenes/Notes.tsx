import { InvitationScroll } from './FamilyScroll';

interface NotesProps {
  config: {
    thingsToNote: string[];
  };
}

export default function Notes({ config }: NotesProps) {
  if (!config.thingsToNote?.length) return null;

  return (
    <section className="scene" style={{ minHeight: 'auto', padding: '1.2rem 1.25rem .5rem', background: '#f6f1e6' }}>
      <InvitationScroll title="A Gentle Note for Our Guests" lines={config.thingsToNote} variant="note" />
    </section>
  );
}
