import { Divider } from '@/components/ui/Divider';

export function Footer() {
  return (
    <footer className="py-16 px-6">
      <Divider />
      <div className="text-center space-y-2 text-sm text-foreground/50">
        <p className="font-display">Stefania Gandal</p>
        <p>
          Published in{' '}
          <span className="italic">Journal of Medieval Art History</span>
        </p>
        <p>&copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
