import { Icon } from "./Icon";

const columns = { Support: ["Help Center", "AirCover", "Anti-discrimination", "Disability support", "Cancellation options"], Community: ["Stayly.org", "Combating discrimination", "Invite friends", "Gift cards"], Hosting: ["List your home", "Host an experience", "Responsible hosting", "Resource center"], About: ["Newsroom", "Careers", "Investors", "Emergency stays"] };

export function Footer() { 
    return <footer className="border-t border-stone-200 bg-stone-50 dark:border-white/10 dark:bg-[#151515]">
        <div className="mx-auto max-w-[1560px] px-5 py-12 lg:px-10">
            <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
                {Object.entries(columns).map(([heading, links]) => <section key={heading}>
                    <h2 className="mb-4 text-sm font-bold">
                        {heading}
                    </h2>
                    <ul className="space-y-3 text-sm text-stone-600 dark:text-stone-400">
                        {links.map((link) => 
                            <li key={link}>
                                <a href="#top" className="hover:underline">{link}</a>
                            </li>
                        )}
                    </ul>
                </section>)}
            </div>
            <div className="mt-12 flex flex-col-reverse justify-between gap-5 border-t border-stone-200 pt-6 text-sm dark:border-white/10 md:flex-row">
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-stone-600 dark:text-stone-400">
                    <span>© 2026 Stayly, Inc.</span>
                    <a href="#top" className="underline">Privacy</a>
                    <a href="#top" className="underline">Terms</a>
                    <a href="#top" className="underline">Sitemap</a>
                </div>
                <div className="flex items-center gap-4">
                    <a href="#top" aria-label="Facebook">
                        <Icon name="facebook" className="size-4" />
                    </a>
                    <a href="#top" aria-label="Instagram">
                        <Icon name="instagram" className="size-4" />
                    </a>
                    <a href="#top" aria-label="Twitter">
                        <Icon name="twitter" className="size-4" />
                    </a>
                    <button className="ml-2 flex items-center gap-2 font-semibold underline">
                        <Icon name="globe" className="size-4" />
                        English (DE) · € EUR
                    </button>
                </div>
            </div>
        </div>
    </footer>; 
}
