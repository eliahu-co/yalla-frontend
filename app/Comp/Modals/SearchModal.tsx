"use client"

import useSearchModal from "@/app/hooks/useSearchModal"
import Modal from "./Modal"

const SearchModal = () => {
    const SearchModal = useSearchModal();

    return(
        <Modal
        isOpen={SearchModal.isOpen}
        onClose={SearchModal.onClose}
        title="Filters"   
        actionLabel = "Search"   
        />
    )
}

export default SearchModal;