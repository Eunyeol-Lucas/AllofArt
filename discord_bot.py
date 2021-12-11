import os
import time

import discord
import requests
from discord.ext import commands

CHECK_URL = "http://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com/api/check/"


def get_status():
    try:
        req = requests.get(CHECK_URL)
        if (req.status_code == 200) & ("test" in req.content):
            return "굿"
        else:
            return "응답은 와요"
    except:
        return "error!"


app = commands.Bot(command_prefix="!")


@app.event
async def on_ready():
    print(app.user.name, "has connected to Discord!")
    await app.change_presence(status=discord.Status.online, activity=None)
    print("ready")


@app.command()
async def check(ctx):
    status = get_status()
    await ctx.send(f"현재 상태는 {status}입니다!")


@app.command()
async def reboot(ctx):
    await ctx.send("failover 스크립트를 수행합니다!")
    os.system("sh ./failover.sh")
    await ctx.send("서버를 켜고 있어요. 15초 뒤에 아무 말이 없으면 관리자에게 말해주세요.")

    for i in range(15):
        if (i + 1) % 5 == 0:
            await ctx.send(f"{i+1}초 경과")
        time.sleep(1)
        status = get_status()
        if status == "굿":
            break
    status = get_status()
    if status == "굿":
        await ctx.send("다시 켜졌습니다!")
        await ctx.send(f"현재 상태는 {get_status()}입니다!")
    else:
        "관리자에게 문의하세요"


app.run("OTE5MjY2MDMzNjk1NTkyNDY4.YbTTNQ.OmHiJEphiN4aiNDBggoVDmeNTp8")
