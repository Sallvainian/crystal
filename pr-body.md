## Description
This PR adds full Windows compatibility to Crystal while fixing an existing issue where the notification toggle doesn't properly disable notifications. The changes ensure Crystal works on Windows without breaking macOS/Linux compatibility.

## Type of Change
<!-- Please delete options that are not relevant -->
- [x] Bug fix (non-breaking change which fixes an issue)
- [x] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Checklist
<!-- Please check all that apply -->
- [x] I have read the [CONTRIBUTING.md](../CONTRIBUTING.md) guidelines
- [x] My code follows the code style of this project
- [x] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [x] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [x] I have run `pnpm typecheck` and `pnpm lint` locally
- [x] I have tested the Electron app locally with `pnpm electron-dev`

## Critical Areas Modified
<!-- Check if you modified any of these critical areas -->
- [ ] Session output handling (requires explicit permission)
- [ ] Timestamp handling
- [x] State management/IPC events
- [ ] Diff viewer CSS

## Screenshots (if applicable)
- Adds a platform aware Continue Button on the output screen:
<img width="234" height="66" alt="0JVDihw - Imgur" src="https://github.com/user-attachments/assets/f6941d56-c908-4bda-8e2e-21e8302e33c0" />

## Additional Notes
- **Windows Path Handling**: Adds cross-platform path utilities to handle Windows backslashes vs Unix forward slashes
- **Worktree Deletion Fix**: Resolves issue where terminal sessions hold file locks on Windows, preventing worktree deletion
- **Notification Settings Fix**: Fixes synchronization issue where notification toggle wasn't properly disabling notifications across all hook instances
- **Build Scripts**: Updates build scripts to use cross-platform commands with `shx`
- **TypeScript Fixes**: Resolves ref type issues that prevent compilation on Windows
- **GitHub Actions**: Added Windows binary building to both `build` and `release` workflows to generate `.exe` installers
- **Testing Note**: The test suite itself needs Windows compatibility updates (uses Unix commands like `touch`). This will be addressed in a follow-up PR as discussed.

All changes maintain backward compatibility with macOS and Linux.