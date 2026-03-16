export const Footer = () => {
  return (
    <footer className="border-t py-8 px-6">
      <div className="mx-auto max-w-5xl flex items-center justify-between text-sm text-muted-foreground">
        <span>kanban</span>
        <span>&copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};
