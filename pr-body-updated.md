## Summary

This PR adds comprehensive Windows compatibility to Crystal while maintaining full compatibility with macOS and Linux. It also fixes a notification settings synchronization issue where toggling notifications off wasn't being properly applied.

### Key Changes:
- ✅ **Windows Compatibility**: Cross-platform path handling, keyboard shortcuts (Cmd vs Ctrl), and file operations
- ✅ **CI/CD Windows Support**: Added Windows binary building to GitHub Actions workflows (build & release)
- ✅ **Fixed Critical Bug**: CI-built Windows binaries can now properly delete worktrees (fixed node-pty rebuild issue)
- ✅ **Notification Fix**: Settings now properly reload when notification preferences change
- ✅ **Comprehensive Testing**: Added Windows-specific Playwright test suite

## What Changed

### Windows Compatibility
- Added cross-platform path utilities for handling Windows backslashes vs Unix forward slashes
- Made keyboard shortcut displays platform-aware (⌘ on Mac, Ctrl on Windows/Linux)
- Enhanced worktree deletion to handle Windows file locks and terminal session cleanup
- Fixed TypeScript ref type issues in input components

### CI/CD Enhancements
- Added Windows to the build matrix in GitHub Actions workflows
- Fixed shell execution issues on Windows runners (bash vs cmd)
- Fixed electron:rebuild to include @homebridge/node-pty-prebuilt-multiarch for proper Windows builds
- Created test workflow for debugging Windows-specific issues

### Bug Fixes
- **Notification Settings**: Fixed synchronization issue where toggling notifications off wasn't being applied
- **Worktree Deletion**: Fixed CI-built Windows binaries failing to delete worktrees due to improper node-pty module rebuilding
- **TypeScript**: Resolved ref type compatibility issues

### Testing
- Added comprehensive Windows-specific Playwright test suite
- Tests cover worktree management, terminal functionality, git operations, and session lifecycle
- All tests passing on Windows

## Testing Performed

- [x] Tested on Windows 11 with local development
- [x] Tested CI-built Windows portable exe - worktree deletion now works correctly
- [x] Tested on macOS to ensure no regressions
- [x] Verified notification settings toggle works properly
- [x] All automated Playwright tests pass on Windows

## Screenshots

_Windows compatibility working with proper path handling and keyboard shortcuts_

## Related Issues

Addresses Windows compatibility requirements and notification settings bugs.

## Checklist

- [x] I have tested these changes locally
- [x] I have added/updated tests as needed
- [x] The code follows the project's coding standards
- [x] I have updated documentation where necessary
- [x] All tests pass