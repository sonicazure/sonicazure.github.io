#!/bin/bash
# git-setup.sh — 配置 Git 快捷别名
# 运行一次即可: ./scripts/git-setup.sh

echo "🔧 配置 Git 快捷别名..."

# 一键保存并推送
git config alias.save '!f() { git add -A && git commit -m "$1" && git push; }; f'

# 拉取最新并推送（同步）
git config alias.sync '!git pull && git push'

# 查看简洁日志
git config alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

# 查看当前状态（精简）
git config alias.st "status -sb"

# 快速查看最近提交
git config alias.last "log -1 HEAD --stat"

# 撤销上次提交（保留更改）
git config alias.undo "reset HEAD~1 --mixed"

# 查看分支列表（带最新提交）
git config alias.br "branch -vv"

# 强制推送（谨慎使用）
git config alias.pushf "push --force-with-lease"

echo "✅ Git 别名配置完成！"
echo ""
echo "可用快捷命令:"
echo "  git save \"提交信息\"     → add + commit + push 一键完成"
echo "  git sync               → pull + push 同步远程"
echo "  git lg                 → 彩色图形化日志"
echo "  git st                 → 精简状态查看"
echo "  git last               → 查看最新提交详情"
echo "  git undo               → 撤销上次提交（保留更改）"
echo "  git br                 → 查看分支及最新提交"
echo "  git pushf              → 安全强制推送"
echo ""
echo "💡 提示: 这些别名仅作用于当前仓库，不会影响全局 Git 配置"
