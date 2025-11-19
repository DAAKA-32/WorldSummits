"""
Generate favicon and app icons from SVG
Requires: pip install cairosvg pillow
"""

try:
    import cairosvg
    from PIL import Image
    import io
    import os

    # Get the project root directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    public_dir = os.path.join(project_root, 'public')
    app_dir = os.path.join(project_root, 'app')

    # Read the SVG file
    svg_path = os.path.join(public_dir, 'icon.svg')

    with open(svg_path, 'r', encoding='utf-8') as f:
        svg_data = f.read()

    # Generate different sizes
    sizes = {
        'favicon-16.png': 16,
        'favicon-32.png': 32,
        'favicon-48.png': 48,
        'apple-touch-icon.png': 180,
        'icon-192.png': 192,
        'icon-512.png': 512,
    }

    print("Generating icons from SVG...")

    for filename, size in sizes.items():
        # Convert SVG to PNG
        png_data = cairosvg.svg2png(
            bytestring=svg_data.encode('utf-8'),
            output_width=size,
            output_height=size
        )

        # Save PNG
        output_path = os.path.join(app_dir if 'apple' in filename or 'icon-' in filename else public_dir, filename)
        with open(output_path, 'wb') as f:
            f.write(png_data)

        print(f"✓ Generated {filename} ({size}x{size})")

    # Create favicon.ico with multiple sizes
    print("\nCreating favicon.ico...")

    # Load the PNG images
    img_16 = Image.open(os.path.join(public_dir, 'favicon-16.png'))
    img_32 = Image.open(os.path.join(public_dir, 'favicon-32.png'))
    img_48 = Image.open(os.path.join(public_dir, 'favicon-48.png'))

    # Save as ICO with multiple sizes
    ico_path = os.path.join(app_dir, 'favicon.ico')
    img_48.save(
        ico_path,
        format='ICO',
        sizes=[(16, 16), (32, 32), (48, 48)]
    )

    print(f"✓ Generated favicon.ico")

    # Clean up temporary PNGs
    os.remove(os.path.join(public_dir, 'favicon-16.png'))
    os.remove(os.path.join(public_dir, 'favicon-32.png'))
    os.remove(os.path.join(public_dir, 'favicon-48.png'))

    print("\n✅ All icons generated successfully!")
    print(f"\nFiles created:")
    print(f"  - {app_dir}\\favicon.ico")
    print(f"  - {app_dir}\\apple-touch-icon.png")
    print(f"  - {app_dir}\\icon-192.png")
    print(f"  - {app_dir}\\icon-512.png")

except ImportError as e:
    print("❌ Missing required packages!")
    print("\nPlease install:")
    print("  pip install cairosvg pillow")
    print(f"\nError: {e}")
except Exception as e:
    print(f"❌ Error: {e}")
