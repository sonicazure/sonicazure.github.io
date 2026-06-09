@echo off
REM quick-push.bat — Windows 一键提交并推送到 GitHub
REM 用法: .\scripts\quick-push.bat ["提交信息"]

echo 🚀 快速推送工具
echo ========================

REM 检查是否在 git 仓库中
git rev-parse --git-dir >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误：当前目录不是 Git 仓库
    exit /b 1
)

REM 获取当前分支
for /f "tokens=*" %%a in ('git branch --show-current') do set BRANCH=%%a
echo 📍 当前分支: %BRANCH%

REM 检查远程更新
echo ⬇️  检查远程更新...
git fetch origin %BRANCH% 2>nul

REM 检查是否有变更
git diff --cached --quiet
git diff --quiet
if %errorlevel% == 0 (
    echo ⚠️ 没有待提交的变更
    exit /b 0
)

REM 显示变更文件
echo 📝 变更文件:
git status --short

REM 提交信息
if "%~1"=="" (
    set /p msg="💬 输入提交信息: "
    if "!msg!"=="" set msg=update %date% %time%
) else (
    set msg=%~1
)

REM 添加所有变更并提交
echo 📦 添加文件...
git add -A

echo 💾 提交: %msg%
git commit -m "%msg%"

REM 推送
echo ⬆️  推送到 origin/%BRANCH%...
git push origin %BRANCH%

echo.
echo ✅ 推送成功！
echo 🌐 页面: https://sonicazure.github.io
echo.
echo ⏳ GitHub Actions 正在构建部署，约需 1-2 分钟...
