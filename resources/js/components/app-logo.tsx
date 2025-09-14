import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex items-center gap-3 text-left text-sm">
                <AppLogoIcon className="size-7 fill-current text-black dark:text-white" />
                <span className="mb-0.5 truncate leading-tight font-semibold">SSA</span>
            </div>
        </>
    );
}
