import { Input, Space, Button } from "antd";
import { useState } from "react";

interface IProps {
  onSearch: (input: string) => void;
  isLoading?: boolean;
}

/** Поисковая строка */
export function Search({ onSearch, isLoading }: IProps) {
  const [searchInput, setSearchInput] = useState("");

  return (
    <Space.Compact size="large" style={{ width: "100%" }}>
      <Input
        placeholder="Введите название объявления"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onPressEnter={() => onSearch(searchInput)}
      />
      <Button type="primary" onClick={() => onSearch(searchInput)} loading={isLoading}>
        Найти
      </Button>
    </Space.Compact>
  );
}
