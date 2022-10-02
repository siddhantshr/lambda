import React, { useEffect } from "react"

import "./thankyou.css"

import queryString from "query-string"

const ThankYou = () => {
    return (
        <div className="thankyou-page">
            <div className="_header">
                <div className="logo"></div>
                <h1>Thank You!</h1>
            </div>
            <div className="_body text-center">
                <div className="_box wrap">
                    <h2>
                        <strong>
                            {queryString.parse(window.location.search).id}
                        </strong>
                    </h2>
                    <p>
                        <b>
                            <a
                                href="https://instagram.com/development.1xsid"
                                className="underline"
                            >
                                Instagram
                            </a>
                        </b>
                        , Question ID:{" "}
                        <b>{queryString.parse(window.location.search).id}</b>
                    </p>
                </div>
            </div>
            <div className="py-12">
                <a href="/">
                    <button
                        type="button"
                        class="flex break-inside bg-[#2ea44f] text-white border-2 border-transparent rounded-3xl px-6 py-3 mb-4 w-half mx-auto"
                    >
                        <div className="m-auto">
                            <div className="flex items-center justify-start flex-1 space-x-4">
                                <i class="fa-solid fa-house-user"></i>
                                <span className="font-medium">
                                    Continue to Homepage
                                </span>
                            </div>
                        </div>
                    </button>
                </a>
            </div>
        </div>
    )
}

export default ThankYou
