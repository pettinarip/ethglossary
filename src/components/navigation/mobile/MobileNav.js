import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import CommonNavItem from '@/components/navigation/CommonNavItem'
import { getLanguageData } from '@/lib/languageUtils'

export const MobileNav = ({ defaultLanguage, navSections }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden"
          aria-label="Open menu"
        >
          <svg
            width="22"
            height="14"
            viewBox="0 0 22 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 0H21.5V2.33333H0.5V0ZM0.5 5.83333H21.5V8.16667H0.5V5.83333ZM0.5 11.6667H21.5V14H0.5V11.6667Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle className="text-left font-sans">ETHglossary</SheetTitle>
          <SheetClose>
            <button
              className="absolute right-4 top-4 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Close menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </SheetClose>
        </SheetHeader>
        <Separator className="mb-20 mt-4" />
        {navSections.map((section, index) => (
          <MobileNavSection
            key={index}
            heading={section.heading}
            items={section.items}
            defaultLanguage={defaultLanguage}
          />
        ))}
      </SheetContent>
    </Sheet>
  )
}

const MobileNavSection = ({ heading, items, defaultLanguage }) => {
  return (
    <>
      <h3 className="mt-6 text-xs uppercase tracking-[2px] text-[#71768A]">
        {heading}
      </h3>
      <MobileNavItemList items={items} defaultLanguage={defaultLanguage} />
    </>
  )
}

const MobileNavItemList = ({ items, defaultLanguage }) => {
  const localLanguageName = getLanguageData(defaultLanguage)?.localName

  return (
    <div className="flex flex-col gap-6">
      {items.map((item, index) => (
        <CommonNavItem
          key={index}
          href={item.href}
          linkText={item.linkText}
          defaultLanguage={item.defaultLanguage ? defaultLanguage : undefined}
          localLanguageName={localLanguageName}
          translatingNow={item.translatingNow}
          isMobile={true}
        />
      ))}
    </div>
  )
}
