
import { Link } from "react-router-dom"
import logo from "../../assets/FreshCart-logo.png"
import styles from "./Footer.module.css"

export default function Footer() {
  return (
   

<footer className="bg-purple-700 text-white">
  <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
    
    <div className="md:flex md:justify-between">
      {/* Brand Logo and Name */}
      <div className="mb-6 md:mb-0">
        <Link to={"/"} className="flex items-center rtl:space-x-reverse mx-2">
          <img src={logo} className="h-8" alt="FreshCart Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            FreshCart
          </span>
        </Link>
      </div>

      {/* Footer Links */}
      <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
        {/* Resources Section */}
        <div>
          <h2 className="mb-6 text-sm font-semibold uppercase">Resources</h2>
          <ul className="text-gray-200 font-medium">
            <li className="mb-4">
              <a href="#" className="hover:text-teal-300 transition-colors duration-200">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-300 transition-colors duration-200">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h2 className="mb-6 text-sm font-semibold uppercase">Follow Us</h2>
          <ul className="text-gray-200 font-medium">
            <li className="mb-4">
              <a href="#" className="hover:text-teal-300 transition-colors duration-200">
                GitHub
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-300 transition-colors duration-200">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
          <ul className="text-gray-200 font-medium">
            <li className="mb-4">
              <a href="#" className="hover:text-teal-300 transition-colors duration-200">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-300 transition-colors duration-200">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Divider */}
    <hr className="my-6 border-gray-600 sm:mx-auto lg:my-8" />

    {/* Footer Bottom */}
    <div className="sm:flex sm:items-center sm:justify-between">
      {/* Copyright */}
      <span className="text-sm sm:text-center">
        © 2023{" "}
        <a href="#" className="hover:text-teal-300 transition-colors duration-200">
          FreshCart™
        </a>
        . All Rights Reserved.
      </span>

      {/* Social Media Links */}
      <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5">
        <a
          href="#"
          className="text-gray-200 hover:text-teal-300 transition-colors duration-200"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M13.1 6H15V3h-3c-2.8 0-5 2.2-5 5v3H6v3h3v8h3v-8h3l1-3H12V6h1.1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Facebook</span>
        </a>
        <a
          href="#"
          className="text-gray-200 hover:text-teal-300 transition-colors duration-200"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M22 5.9c-.8.4-1.7.6-2.6.7.9-.6 1.6-1.5 1.9-2.6-.9.5-1.9.9-2.9 1.1-.8-.9-2-1.5-3.3-1.5-2.5 0-4.5 2-4.5 4.5 0 .4 0 .7.1 1-3.7-.2-7-2-9.2-4.8-.4.7-.6 1.5-.6 2.4 0 1.6.8 3 2 3.8-.7 0-1.4-.2-2-.6v.1c0 2.2 1.6 4 3.7 4.4-.4.1-.8.2-1.3.2-.3 0-.6 0-.9-.1.6 2 2.4 3.4 4.6 3.4-1.7 1.3-3.8 2.1-6.1 2.1-.4 0-.8 0-1.2-.1 2 1.3 4.4 2 7 2 8.4 0 13-7 13-13v-.6c.9-.6 1.6-1.5 1.9-2.6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Twitter</span>
        </a>
        <a
          href="#"
          className="text-gray-200 hover:text-teal-300 transition-colors duration-200"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7C18.3 21.1 22 17 22 12c0-5.5-4.5-10-10-10z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Instagram</span>
        </a>
        <a
          href="#"
          className="text-gray-200 hover:text-teal-300 transition-colors duration-200"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.5 2 2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7C18.3 21.1 22 17 22 12c0-5.5-4.5-10-10-10z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">LinkedIn</span>
        </a>
      </div>
    </div>
  </div>
</footer>


  )
}
