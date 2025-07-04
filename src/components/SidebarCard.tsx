interface SidebarCardProps {
    children: React.ReactNode;
    variant?: 'default' | 'green';
}

const SidebarCard = ({ children, variant = 'default' }: SidebarCardProps) => {
    const getBackgroundStyle = () => {
        if (variant === 'green') {
            return {
                backgroundImage: `
          radial-gradient(ellipse at top, rgba(8, 184, 130, 0.15), transparent 70%),
          radial-gradient(ellipse at bottom, rgba(8, 184, 130, 0.15), transparent 70%),
          linear-gradient(to bottom,
            #08B882
          )`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 40%, 100% 40%, 100% 100%",
                backgroundPosition: "top, bottom, center",
            };
        }
        
        // Default gray theme
        return {
            backgroundImage: `
          radial-gradient(ellipse at top, rgba(255, 255, 255, 0.15), transparent 70%),
          radial-gradient(ellipse at bottom, rgba(255, 255, 255, 0.15), transparent 70%),
          linear-gradient(to bottom,
            rgba(206, 206, 206, 0.17) 0%, 
            rgba(206, 206, 206, 0.04) 10%,
            rgba(206, 206, 206, 0.05) 20%,
            rgba(206, 206, 206, 0.05) 30%, 
            rgba(206, 206, 206, 0.05) 50%,
            rgba(206, 206, 206, 0.05) 80%,
            rgba(206, 206, 206, 0.17) 100%
          )`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 40%, 100% 40%, 100% 100%",
            backgroundPosition: "top, bottom, center",
        };
    };

    return (
        <div
            className="backdrop-blur-lg rounded-2xl py-6 relative"
            style={getBackgroundStyle()}
        >
            {children}
        </div>
    );
};

export default SidebarCard;
