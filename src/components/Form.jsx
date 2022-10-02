import React from "react"

import "./drag-n-drop.css"

import fileDefault from "../assets/file-blank-solid-240.png"
import fileCSS from "../assets/file-css-solid-240.png"
import filePdf from "../assets/file-pdf-solid-240.png"
import filePng from "../assets/file-png-solid-240.png"
import uploadImg from "../assets/cloud-upload-regular-240.png"

export const ImageConfig = {
    default: fileDefault,
    pdf: filePdf,
    png: filePng,
    css: fileCSS,
    upload: uploadImg,
}

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fileList: [],
            question: "",
            submits: 0,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.wrapperRef = React.createRef()
    }

    componentDidMount() {
        fetch("/api/GetFormSubmits")
            .then((response) => response.json())
            .then((data) => this.setState({ submits: data.submits }))
    }

    handleChange(event) {
        this.setState({ question: event.target.value })
    }

    generateIdentity(length) {
        var result = ""
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        var charactersLength = characters.length
        for (var i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            )
        }
        return result
    }

    handleSubmit(event) {
        if (this.state.question.length < 15) {
            alert("Enter a question more than 15 characters in length")
            event.preventDefault()
            return
        }

        fetch("/api/AddFormSubmits")
        const _id = this.generateIdentity(18)
        window.sendMail(_id, this.state.question, this.state.fileList)
        window.location.replace(
            `forms/question/ask/thankyou/submitted?id=${_id}`
        )
        event.preventDefault()
    }

    onDragEnter = () => this.wrapperRef.current.classList.add("dragover")

    onDragLeave = () => this.wrapperRef.current.classList.remove("dragover")

    onDrop = () => this.wrapperRef.current.classList.remove("dragover")

    onFileDrop = (e) => {
        const newFile = e.target.files[0]
        if (newFile) {
            let size =
                Math.round((newFile.size / 11048576 + Number.EPSILON) * 100) /
                100
            if (size > 1) {
                alert(`File cannot be larger than 1MB, Current size: ${size}MB`)
                return
            }
            if (this.state.fileList.length === 5) {
                alert("Cannot add more than 5 files!")
                return
            }
            const updatedList = [...this.state.fileList, newFile]
            this.setState({ fileList: updatedList })
            // props.onFileChange(updatedList);
        }
    }

    fileRemove = (file) => {
        const updatedList = [...this.state.fileList]
        updatedList.splice(this.state.fileList.indexOf(file), 1)
        this.setState({ fileList: updatedList })
        // props.onFileChange(updatedList);
    }

    render() {
        return (
            <>
                <section className="text-gray-400 body-font container px-5 pt-20 pb-16 mx-auto">
                    <div className="p-4 lg:w-3/5 mx-auto">
                        <div className="h-full bg-gray-800 bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-left relative">
                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">
                                FORM
                            </h2>
                            <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3">
                                SUBMIT A QUESTION
                            </h1>
                            <form onSubmit={this.handleSubmit}>
                                <div className="py-6">
                                    <div className="relative mb-4">
                                        <label
                                            htmlFor="question"
                                            className="leading-7 text-sm text-gray-400"
                                        >
                                            Question
                                        </label>
                                        <textarea
                                            id="question"
                                            name="question"
                                            placeholder="The largest wavelength in the UV region of the hydrogen spectrum is 122nm. The smallest wavelength in the IF region is?"
                                            className="w-full bg-gray-800 rounded border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                            defaultValue={""}
                                            value={this.state.question}
                                            onChange={this.handleChange}
                                            required=""
                                        />
                                    </div>
                                </div>

                                <div className="border-solid border-white">
                                    <div
                                        ref={this.wrapperRef}
                                        className="drop-file-input mx-auto border-solid border-white hover:border-dotted"
                                        onDragEnter={this.onDragEnter}
                                        onDragLeave={this.onDragLeave}
                                        onDrop={this.onDrop}
                                    >
                                        <div className="drop-file-input__label">
                                            <img
                                                src={ImageConfig.upload}
                                                alt=""
                                                className="mx-auto pb-6"
                                            />
                                            <p>Drag & Drop your files here</p>
                                        </div>
                                        <input
                                            type="file"
                                            value=""
                                            onChange={this.onFileDrop}
                                        />
                                    </div>
                                    {this.state.fileList.length > 0 ? (
                                        <div className="drop-file-preview">
                                            <p className="text-center">
                                                Ready to upload
                                            </p>
                                            {this.state.fileList.map(
                                                (item, index) => (
                                                    <div
                                                        key={index}
                                                        className="drop-file-preview__item"
                                                    >
                                                        <img
                                                            src={
                                                                ImageConfig[
                                                                    item.type.split(
                                                                        "/"
                                                                    )[1]
                                                                ] ||
                                                                ImageConfig[
                                                                    "default"
                                                                ]
                                                            }
                                                            alt=""
                                                        />
                                                        <div className="drop-file-preview__item__info">
                                                            <p>{item.name}</p>
                                                            <p>
                                                                {Math.round(
                                                                    (item.size /
                                                                        1024 +
                                                                        Number.EPSILON) *
                                                                        100
                                                                ) / 100}
                                                                KB
                                                            </p>
                                                        </div>
                                                        <span
                                                            className="drop-file-preview__item__del"
                                                            onClick={() =>
                                                                this.fileRemove(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            x
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : null}
                                </div>

                                <button
                                    type="submit"
                                    className="my-12 flex break-inside bg-black text-white border-2 border-transparent rounded-3xl px-6 py-3 mb-4 w-half mx-auto dark:bg-slate-800 dark:text-white"
                                >
                                    <div className="m-auto">
                                        <div className="flex items-center justify-start flex-1 space-x-4">
                                            <i className="fa-solid fa-circle-question"></i>
                                            <span className="font-medium mb-[-3px]">
                                                ASK QUESTION
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            </form>

                            <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                                <span className="text-gray-500 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1">
                                    <svg
                                        className="w-4 h-4 mr-1"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx={12} cy={12} r={3} />
                                    </svg>
                                    {this.state.submits}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Form
