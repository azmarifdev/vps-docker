"use client";
import React, {useState, useEffect} from "react";

import {FiSearch} from "react-icons/fi";
import Loader from "@/components/reusable/Loader/Loader";
import {useCategoryListQuery} from "@/redux/api/categoryApi";
import {useProductListsQuery} from "@/redux/api/productApi";
import NotFound from "@/components/shared/NotFound";
import Pagination from "@/components/shared/Pagination";
import ProductTable from "./components/ProductTable";

const ManageProduct = () => {
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [priceOrder, setPriceOrder] = useState<"asc" | "desc" | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] =
        useState<string>(searchTerm);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const {data: categories} = useCategoryListQuery();

    // Debounce effect to delay the API call until the user stops typing
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); // Delay of 500ms
        // Clean up the timeout if the user types within the delay
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // Construct query parameters based on filters
    let queries = `page=${currentPage}&limit=${itemsPerPage}`;
    if (priceOrder) queries += `&sortBy=price&sortOrder=${priceOrder}`;
    if (selectedCategory) queries += `&category=${selectedCategory._id}`;
    if (debouncedSearchTerm) queries += `&search=${debouncedSearchTerm}`;

    const {
        data: products,
        isLoading,
        isFetching,
    } = useProductListsQuery({queries});

    // Calculate the total number of pages
    useEffect(() => {
        if (products?.meta?.total) {
            setTotalPages(Math.ceil(products?.meta.total / itemsPerPage));
        }
    }, [products?.meta?.total, itemsPerPage]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = e.target.value;
        if (categoryId === "") {
            setSelectedCategory(null);
        } else {
            const category = categories?.data.find(
                (cat: any) => cat._id === categoryId
            );
            setSelectedCategory(category || null);
        }
    };

    useEffect(() => {
        setCurrentPage(1); // Reset to the first page when filters change
    }, [itemsPerPage, selectedCategory, debouncedSearchTerm]);

    return (
        <>
            <h2 className="text-2xl mb-8">Manage Products</h2>
            <div className="flex justify-between gap-x-6  gap-y-4 mb-5">
                <div className="relative w-full">
                    <input
                        type="text"
                        id="search"
                        placeholder="Search by name, code, desc, note, features..."
                        className="input-field placeholder:text-gray-400 pl-8 py-2.5 max-w-[450px] w-full"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <FiSearch
                        size={18}
                        className="text-primary absolute top-3 left-2"
                    />
                </div>

                <div className="w-full max-w-[200px]">
                    <select
                        id="price_order"
                        className="input-field py-2.5 w-full bg-transparent"
                        value={priceOrder || ""}
                        onChange={(e) =>
                            setPriceOrder(
                                e.target.value as "asc" | "desc" | null
                            )
                        }>
                        <option value="">Default</option>
                        <option value="asc">Price Low</option>
                        <option value="desc">Price High</option>
                    </select>
                </div>
                <div className="w-full max-w-[400px]">
                    <select
                        id="category"
                        className="input-field py-2.5 w-full bg-transparent"
                        value={selectedCategory?._id || ""}
                        onChange={handleCategoryChange}>
                        <option value="">All Categories</option>
                        {categories?.data?.map((category: any) => (
                            <option key={category._id} value={category._id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {isLoading || isFetching ? (
                <Loader />
            ) : products?.data.length === 0 ? (
                <NotFound message="No products available." />
            ) : (
                <ProductTable data={products?.data} />
            )}
            {/* Pagination component shows only when there are more than 5 items */}
            {products?.meta?.total > 5 ? (
                <div className="mt-10">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        itemsPerPage={itemsPerPage}
                        setCurrentPage={setCurrentPage}
                        setItemsPerPage={setItemsPerPage}
                    />
                </div>
            ) : null}
        </>
    );
};

export default ManageProduct;
