from .utils.tiktok import TikTokApi
from django.http import JsonResponse

api = TikTokApi()

from TikTokApi import TikTokApi

async def get_trending_videos(request):
    videos = []
    count = request.GET.get('limit', 10)
    count = int(count)
    # if len(api.sessions) == 0:
    await api.create_sessions(ms_tokens=["442_691eCysRDmg2_SNJHHh5E2nCDd1uxIYh5MsO07rmbnAy7NzBTZfCwxtZhHu2vLDHBoOn8AZFMA4EvMNwYRg9KfUiACx0_78hEW_o52hAbcXJFd4AeeU1ZXN8tJdrE4cSsiMJMzhJaw=="], num_sessions=1, sleep_after=3)
    async for video in api.trending.videos(count=count):
        videos.append(video.as_dict)
        print(video.as_dict)
    await api.close_sessions()
    return JsonResponse({
        'videos': videos,
        'total': len(videos)
    }, safe=False)
