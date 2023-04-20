import { Chip, Stack } from "@mui/material";

type SelectNetworkProps = {
  options: { id: number; name: string }[];
  onSelect: (value: number) => void;
  selectedChainId: number | null;
};

export default function SelectNetwork({
  options,
  onSelect,
  selectedChainId,
}: SelectNetworkProps) {
  return (
    <Stack direction="row" flexWrap={"wrap"}>
      {options.map((x) => {
        const isSelected = selectedChainId === x.id;
        return (
          <Chip
            key={x.id}
            variant={isSelected ? "filled" : "outlined"}
            label={x.name}
            onClick={() => onSelect(x.id)}
            color={isSelected ? "primary" : "default"}
            sx={{ m: 0.5}}
          />
        );
      })}
    </Stack>
  );
}
