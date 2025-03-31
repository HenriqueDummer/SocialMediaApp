import { useState, type FormEvent } from "react"
import { Button } from "./ui/button"
import Container from "./ui/Container"
import { Input } from "./ui/input"
import { useMutation } from "@tanstack/react-query"
import { mutateSearchUsers } from "../utils/hooks"
import type { UserType } from "../types/types"
import Search from "./Search"

const RightSideBar = () => {

  return (
    <div className="w-1/4">
      <Search />  
    </div>
  )
}

export default RightSideBar