from pathlib import Path
from datetime import datetime


def main() -> None:
    """Generates a TypeScript type definition file for icon names based on the SVG files in the public/icons directory."""

    repo_root = Path(__file__).resolve().parents[1]
    icons_dir = repo_root / "public" / "icons"
    output_file = repo_root / "src" / "types" / "icons.d.ts"

    icon_names = sorted(
        {icon_path.stem for icon_path in icons_dir.glob("*.svg") if icon_path.is_file()}
    )

    if icon_names:
        union_type = " | ".join(f"'{icon_name}'" for icon_name in icon_names)
        content = f"export type IconName = {union_type}\n"
    else:
        content = "export type IconName = never\n"

    output_file.parent.mkdir(parents=True, exist_ok=True)
    output_file.write_text(content, encoding="utf-8")

    generation_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(
        f"Detected {len(icon_names)} icon names. Regenerated {output_file} (at {generation_time})."
    )


if __name__ == "__main__":
    main()
