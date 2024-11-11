import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface SkillsInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function TagsInput({ tags, setTags }: SkillsInputProps) {
  const [tag, setTag] = useState<string>("");

  const addTag = () => {
    if (tag && !tags.includes(tag)) {
        setTags([...tags, tag]);
      setTag("");
    }
  };

  const removeSkill = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <Label htmlFor="tags">Tags</Label>
      <div className="flex gap-2">
        <Input
          id="tags"
          type="text"
          placeholder="Add Tags"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <Button type="button" onClick={addTag}>
          Add
        </Button>
      </div>
      <ul className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag, index) => (
          <li key={index} className="bg-secondary p-2 rounded flex items-center">
            {tag}
            <Button
              type="button"
              variant="destructive"
              className="h-2 w-2 px-2"
              onClick={() => removeSkill(index)}
            >
              x
            </Button>
          </li>
        ))}
      </ul>
      <input type="hidden" name="tags" value={JSON.stringify(tags)} />
    </div>
  );
}
