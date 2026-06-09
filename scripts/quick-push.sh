#!/bin/bash
# quick-push.sh — 一键提交并推送到 GitHub
# 用法: ./scripts/quick-push.sh ["提交信息"]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 快速推送工具${NC}"
echo "========================"

# 检查是否在 git 仓库中
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ 错误：当前目录不是 Git 仓库${NC}"
    exit 1
fi

# 获取当前分支
BRANCH=$(git branch --show-current)
echo -e "${BLUE}📍 当前分支: $BRANCH${NC}"

# 检查远程更新
echo -e "${YELLOW}⬇️  检查远程更新...${NC}"
git fetch origin $BRANCH 2>/dev/null || true

LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u} 2>/dev/null || echo "")
BASE=$(git merge-base @ @{u} 2>/dev/null || echo "")

if [ "$REMOTE" != "" ] && [ "$LOCAL" != "$REMOTE" ] && [ "$LOCAL" = "$BASE" ]; then
    echo -e "${YELLOW}⚠️  远程有更新，先执行合并...${NC}"
    git pull origin $BRANCH
    echo -e "${GREEN}✅ 已同步远程更新${NC}"
fi

# 检查是否有变更
if git diff --cached --quiet && git diff --quiet; then
    echo -e "${YELLOW}⚠️  没有待提交的变更${NC}"
    exit 0
fi

# 显示变更文件
echo -e "${BLUE}📝 变更文件:${NC}"
git status --short

# 提交信息
if [ -z "$1" ]; then
    echo ""
    read -p "💬 输入提交信息: " msg
    if [ -z "$msg" ]; then
        msg="update $(date '+%Y-%m-%d %H:%M')"
        echo -e "${YELLOW}⚠️  未输入提交信息，使用默认: $msg${NC}"
    fi
else
    msg="$1"
fi

# 添加所有变更并提交
echo -e "${YELLOW}📦 添加文件...${NC}"
git add -A

echo -e "${YELLOW}💾 提交: $msg${NC}"
git commit -m "$msg"

# 推送
echo -e "${YELLOW}⬆️  推送到 origin/$BRANCH...${NC}"
git push origin $BRANCH

echo ""
echo -e "${GREEN}✅ 推送成功！${NC}"
echo -e "${BLUE}🔗 仓库: $(git remote get-url origin | sed 's/\.git$//')${NC}"
echo -e "${BLUE}🌐 页面: https://sonicazure.github.io${NC}"
echo ""
echo -e "${YELLOW}⏳ GitHub Actions 正在构建部署，约需 1-2 分钟...${NC}"
echo -e "${BLUE}   查看进度: $(git remote get-url origin | sed 's/\.git$//')/actions${NC}"
