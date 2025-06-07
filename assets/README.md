# Assets Directory

This directory contains media files for the AI Crash Finder extension.

## Video Demo

The `Demo.mp4` file should be placed in the root directory of the project.

### Creating a GIF Preview

To create a GIF preview from your Demo.mp4 for better GitHub compatibility:

```bash
# Using ffmpeg to create a GIF preview (first 10 seconds)
ffmpeg -i ../Demo.mp4 -t 10 -vf "fps=10,scale=800:-1:flags=lanczos" -c:v gif demo-preview.gif

# Or using gifski for better quality
ffmpeg -i ../Demo.mp4 -t 10 -vf "fps=10,scale=800:-1" -pix_fmt yuv420p frames_%04d.png
gifski -o demo-preview.gif frames_*.png
rm frames_*.png
```

### Hosting Options

For better video playback, consider:

1. **GitHub Releases**: Upload Demo.mp4 as a release asset
2. **GitHub Pages**: Host the video on GitHub Pages
3. **External Hosting**: Use YouTube, Vimeo, or Streamable
4. **Git LFS**: Use Git Large File Storage for the video file

### Adding to Git LFS

```bash
# Initialize Git LFS
git lfs track "*.mp4"
git add .gitattributes
git add Demo.mp4
git commit -m "Add demo video with Git LFS"
```

## Screenshots

Place screenshots in the `screenshots/` subdirectory with descriptive names:
- `01-configure.png`
- `02-select-commits.png`
- `03-describe-issue.png`
- `04-results.png`
