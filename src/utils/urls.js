export default {
  queryValiCode: '/api/common/sms/send_login.vm', // 请求验证码
  codeLogin: '/api/c/login/mobile/login_by_mobile.vm', // 验证码登录
  queryMine: '/api/c/user_info/personal_center.vm', // 个人信息
  queryMemberTotal: ' /api/c/agent/my_custom_summary.vm', // 查询客户人数和总收入
  queryMemberList: ' /api/c/agent/my_custom_list.vm', // 客户list
  queryAgentList: '/api/c/agent/sub_agent_list.vm', // 代理list
  queryAgentTotal: '/api/c/agent/sub_member_summary.vm'
}