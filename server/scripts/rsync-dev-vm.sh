#! /bin/bash
VM_SSH_KEY="./vms/dev.id_rsa"
TARGET='./server'

rsync -av \
  --filter='P bin' \
  --delete \
  --exclude "node_modules" \
  -e "ssh -p 2222 -i $VM_SSH_KEY" \
  $TARGET \
  dev@localhost:.

