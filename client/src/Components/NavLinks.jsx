import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import companyLogo from "../assets/logo/2222.png";
import { NavLink, useNavigate } from "react-router";
import SearchBar from "./SearchBar";
import axios from "axios";
import ProfileCard from "./ProfileCard";
import {useDispatch,useSelector} from 'react-redux'
import {clearCart } from '../redux/cartSlice'
const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "T-Shirts", href: "#" },
            { name: "Dresses", href: "#" },
            { name: "Jeans", href: "#" },
            { name: "Denim", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "T-Shirts", href: "#" },
            { name: "Jeans", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        }
      ],
    },
  ],
  pages: [{ name: "Products", to: "/products" }],
};

export default function NavLinks() {
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [currentUserId,setCurrentUserId]=useState('');
  const [currentUserName,setCurrentName]=useState('');
  const [isOpen, setIsOpen] = useState(false);
  const carts = useSelector((store) => store.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const UserEmail = localStorage.getItem("email");
  const isUserSignedIn = !!localStorage.getItem("token");
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("user-info");
    dispatch(clearCart());
    navigate("/login");
  };
  
  useEffect(()=>{
    FetchUserData()
  },[UserEmail])
  
  async function FetchUserData(){
    const response = await axios.get('/api/v1/users');
    const CurrentUser = response.data.find((user)=> user.email === UserEmail )
    if(CurrentUser){
      setCurrentUserId(CurrentUser._id)
      setCurrentName(CurrentUser.name)
  }
}
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOutsideClick = (event) => {
    // Check if the click is outside the dropdown
    if (!event.target.closest(".dropdown")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside of the dropdown
    document.addEventListener("click", handleOutsideClick);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  function closeModal() {
    setOpenSearch(!openSearch);
  }
  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-10 px-4 pb-8 pt-10"
                  >
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p
                          id={`${category.id}-${section.id}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <NavLink
                                to={`/products/?category=${encodeURIComponent(item.name)}`}
                                className="-m-2 block p-2 text-gray-500"
                              >
                                {item.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <NavLink
                    to={page.to}
                    className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                  >
                    {page.name}
                  </NavLink>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            {isUserSignedIn ? (
                <div className="relative inline-block dropdown">
                {/* Dropdown toggle button */}
                <button
                  onClick={toggleDropdown}
                  className="-m-2 relative z-10 flex  text-gray-900 bg-white border border-transparent rounded-md"
                >
                  <span className="mx-1">{currentUserName}</span>
                  <svg
                    className="w-5 h-5 mx-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>

                {/* Dropdown menu */}
                {isOpen && (
                  <div className="absolute right-[100] z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow dark:bg-gray-800">
                    <a
                      href="#"
                      className="flex items-center p-2 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                     <ProfileCard name={currentUserName}/>
                      <div className="mx-1">
                        <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                          {currentUserName}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {UserEmail}
                        </p>
                      </div>
                    </a>

                    <hr className="border-gray-200 dark:border-gray-700" />

                    <NavLink
                          to={`/orderstatus/${currentUserId}`}
                          className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className="-ml-1"
                            width={27}
                            height={27}
                            viewBox="0 0 256 256"
                            xmlSpace="preserve"
                          >
                            <defs />
                            <g
                              style={{
                                stroke: "none",
                                strokeWidth: 0,
                                strokeDasharray: "none",
                                strokeLinecap: "butt",
                                strokeLinejoin: "miter",
                                strokeMiterlimit: 10,
                                fill: "none",
                                fillRule: "nonzero",
                                opacity: 1,
                              }}
                              transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                            >
                              <path
                                d="M 89.334 47.69 L 79.145 36.229 c -0.5 -0.563 -1.218 -0.885 -1.97 -0.885 h -9.356 v -6.467 c 0 -3.053 -2.1 -5.537 -4.681 -5.537 H 31.866 c -2.581 0 -4.681 2.484 -4.681 5.537 v 30.23 c 0 1.758 1.245 3.188 2.774 3.188 h 7.277 c 0.563 2.495 2.794 4.365 5.457 4.365 s 4.893 -1.87 5.457 -4.365 h 17.669 h 2 h 7.542 c 0.563 2.495 2.794 4.365 5.457 4.365 s 4.894 -1.87 5.457 -4.365 h 1.089 c 1.453 0 2.636 -1.183 2.636 -2.636 V 49.441 C 90 48.797 89.764 48.175 89.334 47.69 z M 86.773 47.819 H 74.619 c -0.255 0 -0.463 -0.207 -0.463 -0.462 v -5.44 c 0 -0.255 0.208 -0.463 0.463 -0.463 h 6.495 L 86.773 47.819 z M 42.693 64.66 c -1.984 0 -3.598 -1.614 -3.598 -3.598 c 0 -1.984 1.614 -3.599 3.598 -3.599 s 3.598 1.614 3.598 3.599 C 46.291 63.046 44.677 64.66 42.693 64.66 z M 48.232 60.295 c -0.376 -2.724 -2.713 -4.831 -5.539 -4.831 s -5.163 2.107 -5.539 4.831 h -7.195 c -0.366 0 -0.774 -0.487 -0.774 -1.188 v -30.23 c 0 -1.95 1.203 -3.537 2.681 -3.537 h 31.272 c 1.479 0 2.681 1.587 2.681 3.537 v 6.467 v 15.598 H 38.095 c -0.552 0 -1 0.447 -1 1 s 0.448 1 1 1 h 27.724 v 7.353 H 48.232 z M 80.817 64.66 c -1.983 0 -3.598 -1.614 -3.598 -3.598 c 0 -1.984 1.614 -3.599 3.598 -3.599 c 1.984 0 3.599 1.614 3.599 3.599 C 84.416 63.046 82.802 64.66 80.817 64.66 z M 87.364 60.295 h -1.007 c -0.376 -2.724 -2.714 -4.831 -5.54 -4.831 s -5.163 2.107 -5.539 4.831 h -7.46 V 37.344 h 9.356 c 0.182 0 0.354 0.078 0.476 0.214 l 1.686 1.896 h -4.717 c -1.358 0 -2.463 1.105 -2.463 2.463 v 5.44 c 0 1.357 1.104 2.462 2.463 2.462 H 88 v 9.84 C 88 60.01 87.715 60.295 87.364 60.295 z"
                                style={{
                                  stroke: "none",
                                  strokeWidth: 1,
                                  strokeDasharray: "none",
                                  strokeLinecap: "butt",
                                  strokeLinejoin: "miter",
                                  strokeMiterlimit: 10,
                                  fill: "rgb(0,0,0)",
                                  fillRule: "nonzero",
                                  opacity: 1,
                                }}
                                transform=" matrix(1 0 0 1 0 0) "
                                strokeLinecap="round"
                              />
                              <path
                                d="M 21.207 52.942 H 8.615 c -0.552 0 -1 -0.447 -1 -1 s 0.448 -1 1 -1 h 12.592 c 0.552 0 1 0.447 1 1 S 21.759 52.942 21.207 52.942 z"
                                style={{
                                  stroke: "none",
                                  strokeWidth: 1,
                                  strokeDasharray: "none",
                                  strokeLinecap: "butt",
                                  strokeLinejoin: "miter",
                                  strokeMiterlimit: 10,
                                  fill: "rgb(0,0,0)",
                                  fillRule: "nonzero",
                                  opacity: 1,
                                }}
                                transform=" matrix(1 0 0 1 0 0) "
                                strokeLinecap="round"
                              />
                              <path
                                d="M 21.207 46.031 H 4.617 c -0.552 0 -1 -0.448 -1 -1 s 0.448 -1 1 -1 h 16.59 c 0.552 0 1 0.448 1 1 S 21.759 46.031 21.207 46.031 z"
                                style={{
                                  stroke: "none",
                                  strokeWidth: 1,
                                  strokeDasharray: "none",
                                  strokeLinecap: "butt",
                                  strokeLinejoin: "miter",
                                  strokeMiterlimit: 10,
                                  fill: "rgb(0,0,0)",
                                  fillRule: "nonzero",
                                  opacity: 1,
                                }}
                                transform=" matrix(1 0 0 1 0 0) "
                                strokeLinecap="round"
                              />
                              <path
                                d="M 21.207 39.121 H 1 c -0.552 0 -1 -0.448 -1 -1 s 0.448 -1 1 -1 h 20.207 c 0.552 0 1 0.448 1 1 S 21.759 39.121 21.207 39.121 z"
                                style={{
                                  stroke: "none",
                                  strokeWidth: 1,
                                  strokeDasharray: "none",
                                  strokeLinecap: "butt",
                                  strokeLinejoin: "miter",
                                  strokeMiterlimit: 10,
                                  fill: "rgb(0,0,0)",
                                  fillRule: "nonzero",
                                  opacity: 1,
                                }}
                                transform=" matrix(1 0 0 1 0 0) "
                                strokeLinecap="round"
                              />
                            </g>
                          </svg>
                          <span className="ml-2">Order Status</span>
                        </NavLink>
                    <hr className="border-gray-200 dark:border-gray-700 " />
                    {/* Add more links */}
                    
                    <button
                      onClick={handleSignOut}
                      className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <svg
                        className="w-5 h-5 mx-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z"
                          fill="currentColor"
                        ></path>
                      </svg>

                      <span className="mx-1">Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
              ):(
                <>
                <div className="flow-root">
                <NavLink
                  to={"/login"}
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign in
                </NavLink>
              </div>
              <div className="flow-root">
                <NavLink
                  to={"/register"}
                  className="-m-2 p-2 block font-medium  text-gray-900"
                >
                  Create account
                </NavLink>
              </div>
              </>
              )}
            </div>

            {/* <div className="border-t border-gray-200 px-4 py-6">
              <a href="#" className="-m-2 flex items-center p-2">
                <img
                  alt=""
                  src="https://tailwindui.com/plus/img/flags/flag-canada.svg"
                  className="block h-auto w-5 shrink-0"
                />
                <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                <span className="sr-only">, change currency</span>
              </a>
            </div> */}
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative py-7">
        <div className="loop-slider">
          <div className="flex justify-center w-full inner">
            <div className="h-10  px-4 text-sm font-medium text-black sm:px-6 lg:px-8 tag">
              Get free delivery on orders over $100
            </div>
            <div className="h-10  px-4 text-sm font-medium text-black sm:px-6 lg:px-8 tag">
            Spend $100 & Get Free Shipping! 
            </div>
            <div className=" h-10   px-4 text-sm font-medium text-black sm:px-6 lg:px-8 tag">
              Get free delivery on orders over $100
            </div>
            <div className="h-10   px-4 text-sm font-medium text-black sm:px-6 lg:px-8 tag">
            Spend $100 & Get Free Shipping! 
            </div>
            <div className="flex h-10 items-center justify-center px-4 text-sm font-medium text-black sm:px-6 lg:px-8 tag">
              Get free delivery on orders over $100
            </div>
            <div className="h-10   px-4 text-sm font-medium text-black sm:px-6 lg:px-8 tag">
            Spend $100 & Get Free Shipping! 
            </div>
            <div className="h-10   px-4 text-sm font-medium text-black sm:px-6 lg:px-8 tag">
              Get free delivery on orders over $100
            </div>
            <div className="h-10   px-4 text-sm font-medium text-black sm:px-6 lg:px-8 tag">
            Spend $100 & Get Free Shipping! 
            </div>
            <div className="h-10  px-4 text-sm font-medium text-black sm:px-6 lg:px-8 tag">
              Get free delivery on orders over $100
            </div>
            <div className="h-10   px-4 text-sm font-medium text-black sm:px-6 lg:px-8 tag">
            Spend $100 & Get Free Shipping! 
            </div>
          </div>
        </div>

        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className=" border-b border-gray-200 px-2">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <NavLink to={"/"}>
                  <span className="sr-only">Your Company</span>
                  <img alt="logo" src={companyLogo} className="h-8 w-auto" />
                </NavLink>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton className="relative z-40 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600">
                          {category.name}
                        </PopoverButton>
                      </div>

                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 top-1/2 bg-white shadow z-40"
                        />

                        <div className="relative bg-white z-40">
                          <div className="mx-auto max-w-7xl px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p
                                      id={`${section.name}-heading`}
                                      className="font-medium text-gray-900"
                                    >
                                      {section.name}
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`${section.name}-heading`}
                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      {section.items.map((item) => (
                                        <li key={item.name} className="flex">
                                          <NavLink
                                            to={`/products/?category=${encodeURIComponent(item.name)}`}
                                            className="hover:text-gray-800"
                                          >
                                            {item.name}
                                          </NavLink>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <NavLink
                      key={page.name}
                      to={page.to}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
                    >
                      {page.name}
                    </NavLink>
                  ))}
                </div>
              </PopoverGroup>
              <div className="ml-auto flex items-center">
              {isUserSignedIn ? (
                <div className="relative inline-block dropdown">
                  {/* Dropdown toggle button */}
                  <button
                    onClick={toggleDropdown}
                    className="relative z-10 flex items-center p-2 text-sm text-gray-700 bg-white border border-transparent rounded-md hover:text-gray-900"
                  >
                    <span className="mx-1">{currentUserName}</span>
                    <svg
                      className="w-5 h-5 mx-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>

                  {/* Dropdown menu */}
                  {isOpen && (
                    <div className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-md dark:bg-gray-800">
                      <NavLink
                        to={'/'}
                        className="flex items-center p-2 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                       <ProfileCard name={currentUserName}/>
                        <div className="mx-1">
                          <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                            {currentUserName}
                          </h1>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {UserEmail}
                          </p>
                        </div>
                      </NavLink>

                      <hr className="border-gray-200 dark:border-gray-700" />

                      <NavLink
                        to={`/orderstatus/${currentUserId}`}
                        className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          className="-ml-1"
                          width={27}
                          height={27}
                          viewBox="0 0 256 256"
                          xmlSpace="preserve"
                        >
                          <defs />
                          <g
                            style={{
                              stroke: "none",
                              strokeWidth: 0,
                              strokeDasharray: "none",
                              strokeLinecap: "butt",
                              strokeLinejoin: "miter",
                              strokeMiterlimit: 10,
                              fill: "none",
                              fillRule: "nonzero",
                              opacity: 1,
                            }}
                            transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                          >
                            <path
                              d="M 89.334 47.69 L 79.145 36.229 c -0.5 -0.563 -1.218 -0.885 -1.97 -0.885 h -9.356 v -6.467 c 0 -3.053 -2.1 -5.537 -4.681 -5.537 H 31.866 c -2.581 0 -4.681 2.484 -4.681 5.537 v 30.23 c 0 1.758 1.245 3.188 2.774 3.188 h 7.277 c 0.563 2.495 2.794 4.365 5.457 4.365 s 4.893 -1.87 5.457 -4.365 h 17.669 h 2 h 7.542 c 0.563 2.495 2.794 4.365 5.457 4.365 s 4.894 -1.87 5.457 -4.365 h 1.089 c 1.453 0 2.636 -1.183 2.636 -2.636 V 49.441 C 90 48.797 89.764 48.175 89.334 47.69 z M 86.773 47.819 H 74.619 c -0.255 0 -0.463 -0.207 -0.463 -0.462 v -5.44 c 0 -0.255 0.208 -0.463 0.463 -0.463 h 6.495 L 86.773 47.819 z M 42.693 64.66 c -1.984 0 -3.598 -1.614 -3.598 -3.598 c 0 -1.984 1.614 -3.599 3.598 -3.599 s 3.598 1.614 3.598 3.599 C 46.291 63.046 44.677 64.66 42.693 64.66 z M 48.232 60.295 c -0.376 -2.724 -2.713 -4.831 -5.539 -4.831 s -5.163 2.107 -5.539 4.831 h -7.195 c -0.366 0 -0.774 -0.487 -0.774 -1.188 v -30.23 c 0 -1.95 1.203 -3.537 2.681 -3.537 h 31.272 c 1.479 0 2.681 1.587 2.681 3.537 v 6.467 v 15.598 H 38.095 c -0.552 0 -1 0.447 -1 1 s 0.448 1 1 1 h 27.724 v 7.353 H 48.232 z M 80.817 64.66 c -1.983 0 -3.598 -1.614 -3.598 -3.598 c 0 -1.984 1.614 -3.599 3.598 -3.599 c 1.984 0 3.599 1.614 3.599 3.599 C 84.416 63.046 82.802 64.66 80.817 64.66 z M 87.364 60.295 h -1.007 c -0.376 -2.724 -2.714 -4.831 -5.54 -4.831 s -5.163 2.107 -5.539 4.831 h -7.46 V 37.344 h 9.356 c 0.182 0 0.354 0.078 0.476 0.214 l 1.686 1.896 h -4.717 c -1.358 0 -2.463 1.105 -2.463 2.463 v 5.44 c 0 1.357 1.104 2.462 2.463 2.462 H 88 v 9.84 C 88 60.01 87.715 60.295 87.364 60.295 z"
                              style={{
                                stroke: "none",
                                strokeWidth: 1,
                                strokeDasharray: "none",
                                strokeLinecap: "butt",
                                strokeLinejoin: "miter",
                                strokeMiterlimit: 10,
                                fill: "rgb(0,0,0)",
                                fillRule: "nonzero",
                                opacity: 1,
                              }}
                              transform=" matrix(1 0 0 1 0 0) "
                              strokeLinecap="round"
                            />
                            <path
                              d="M 21.207 52.942 H 8.615 c -0.552 0 -1 -0.447 -1 -1 s 0.448 -1 1 -1 h 12.592 c 0.552 0 1 0.447 1 1 S 21.759 52.942 21.207 52.942 z"
                              style={{
                                stroke: "none",
                                strokeWidth: 1,
                                strokeDasharray: "none",
                                strokeLinecap: "butt",
                                strokeLinejoin: "miter",
                                strokeMiterlimit: 10,
                                fill: "rgb(0,0,0)",
                                fillRule: "nonzero",
                                opacity: 1,
                              }}
                              transform=" matrix(1 0 0 1 0 0) "
                              strokeLinecap="round"
                            />
                            <path
                              d="M 21.207 46.031 H 4.617 c -0.552 0 -1 -0.448 -1 -1 s 0.448 -1 1 -1 h 16.59 c 0.552 0 1 0.448 1 1 S 21.759 46.031 21.207 46.031 z"
                              style={{
                                stroke: "none",
                                strokeWidth: 1,
                                strokeDasharray: "none",
                                strokeLinecap: "butt",
                                strokeLinejoin: "miter",
                                strokeMiterlimit: 10,
                                fill: "rgb(0,0,0)",
                                fillRule: "nonzero",
                                opacity: 1,
                              }}
                              transform=" matrix(1 0 0 1 0 0) "
                              strokeLinecap="round"
                            />
                            <path
                              d="M 21.207 39.121 H 1 c -0.552 0 -1 -0.448 -1 -1 s 0.448 -1 1 -1 h 20.207 c 0.552 0 1 0.448 1 1 S 21.759 39.121 21.207 39.121 z"
                              style={{
                                stroke: "none",
                                strokeWidth: 1,
                                strokeDasharray: "none",
                                strokeLinecap: "butt",
                                strokeLinejoin: "miter",
                                strokeMiterlimit: 10,
                                fill: "rgb(0,0,0)",
                                fillRule: "nonzero",
                                opacity: 1,
                              }}
                              transform=" matrix(1 0 0 1 0 0) "
                              strokeLinecap="round"
                            />
                          </g>
                        </svg>
                        <span className="ml-2">Order Status</span>
                      </NavLink>
                      <hr className="border-gray-200 dark:border-gray-700 " />
                      {/* Add more links */}
                      <button onClick={handleSignOut}
                        className="flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <svg
                          className="w-5 h-5 mx-1"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z"
                            fill="currentColor"
                          ></path>
                        </svg>

                        <span className="mx-1">Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ):(
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <NavLink
                    to={"/login"}
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Sign in
                  </NavLink>
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                  <NavLink
                    to={"/register"}
                    className="text-sm font-medium hover:text-gray-800 text-gray-700"
                  >
                    Create account
                  </NavLink>
                </div>
              )}

                {/* <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                    <img
                      alt=""
                      src="https://tailwindui.com/plus/img/flags/flag-canada.svg"
                      className="block h-auto w-5 shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div> */}

                {/* Search */}
                <div className="flex lg:ml-6">
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="size-6"
                      onClick={closeModal}
                    />
                  </button>
                </div>
                {openSearch ? <SearchBar CloseModel={closeModal} /> : null}
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <NavLink
                    to={"/addcart"}
                    className="group -m-2 flex items-center p-2"
                  >
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {carts.cartTotalQuantity === 0 ? '0' : carts.cartTotalQuantity}
                    </span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
